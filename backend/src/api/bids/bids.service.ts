import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AppUser } from '../users/entities/appuser.entity';
import { Product } from '../products/entities/product.entity';
import { Bid } from 'src/api/bids/entities/bid.entity';

@Injectable()
export class BidsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(AppUser)
    private usersRepository: Repository<AppUser>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>
  ) { }

  async createBid(
    userId: string,
    productId: string,
    bid_attempt_amount: number,
    bid_phase: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const product = await this.productsRepository.findOneBy({ id: productId, status: 'published' });

    if (userId === product.userId) {
      throw new BadRequestException('Cannot bid your item');
    }

    if (!product) {
      throw new BadRequestException('Invalid item');
    }

    const dateExpires = new Date(product.published_at).getTime() + product.time_window;

    const now = new Date().getTime();
    const difference = dateExpires - now;

    if (difference < 0) {
      throw new BadRequestException('Cannot bid expired item');
    }

    if (user.temporary_hold && user.temporary_hold > 0) {
      const difference = user.balance - user.temporary_hold;
      if (bid_attempt_amount > difference) {
        throw new BadRequestException('Cannot place a bid greater your remaining');
      }
    } else if (bid_attempt_amount > user.balance) {
      throw new BadRequestException('Cannot place a bid greater than your balance');
    }

    if (!product) {
      throw new BadRequestException('Not found');
    }

    if (bid_attempt_amount <= product.price || bid_attempt_amount <= product.bid_price) {
      throw new BadRequestException('Your bid price must be higher than the current bid price');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    let bid = null;
    try {
      // await new Promise(resolve => setTimeout(resolve, 10000));
      bid = await this.bidsRepository.findOne({
        where: {
          user: { id: userId },
          product: { id: productId }
        },
        order: {
          created_at: "DESC",
        },
      }
      );

      if (bid) {
        user.temporary_hold =
          user.temporary_hold + (bid_attempt_amount - bid.bid_attempt_price);
      } else {
        if (!user.temporary_hold) {
          user.temporary_hold = bid_attempt_amount;
        } else {
          user.temporary_hold += bid_attempt_amount;
        }
      }
      product.bid_price = bid_attempt_amount;
      const newBid = this.bidsRepository.create(
        {
          user: { id: userId },
          product: { id: productId },
          bid_attempt_price: bid_attempt_amount,
          bid_phase
        }
      );
      const newUser = await this.usersRepository.save(user);
      const newProduct = await this.productsRepository.save(product);
      await this.bidsRepository.save(newBid);
      await queryRunner.commitTransaction();

      const result = {
        userId: newUser.id,
        productId: newProduct.id,
        balance: newUser.balance,
        temporary_hold: newUser.temporary_hold,
        bid_price: newProduct.bid_price
      };
      return result;
    } catch (error) {
      console.log('error transaction create bid', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async transferItem(userId: string, productId: string, bid_phase: number): Promise<any> {
    const bid = await this.bidsRepository.findOne({
      relations: {
        user: true,
        product: true,
      },
      where: {
        productId,
        bid_phase
      },
      order: {
        bid_attempt_price: "DESC",
      },
    });

    // Check if item not exist or never bid
    if (!bid) {
      const product = await this.productsRepository.findOneBy({ id: productId });
      if (!product) {
        throw new BadRequestException('Invalid product');
      }

      if (product.status == 'unpublished') {
        return { refresh: true }
      }

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction('SERIALIZABLE');

      try {
        this.productsRepository.createQueryBuilder()
          .setLock('pessimistic_write')
          .update(Product)
          .set({ status: 'unpublished' })
          .where("id = :id", { id: productId })
          .execute()
        await this.productsRepository.save(product);
        await queryRunner.commitTransaction();
        return { putback: true };
      } catch (error) {
        console.log('error transaction put back item', error);
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }

    // Detect if a request coming from a successful bid
    if (bid.user.id == userId) {
      const user = await this.usersRepository.findOneBy({ id: userId });
      const product = await this.productsRepository.findOneBy({ id: productId });

      // Deduct user balance
      user.balance -= bid.bid_attempt_price;
      user.temporary_hold -= bid.bid_attempt_price;
      if (user.temporary_hold == 0) {
        user.temporary_hold = null;
      }

      // // Transfer product
      product.userId = userId;
      product.price = bid.bid_attempt_price;
      product.bid_price = bid.bid_attempt_price;
      product.status = 'unpublished';
      product.published_at = null;
      await this.usersRepository.save(user);
      await this.productsRepository.save(product);
      return { transfer: true };
    } else {
      // If a request coming from a failed bid
      const newBid = await this.bidsRepository.findOne({
        where: {
          userId,
          productId,
          bid_phase
        },
        order: {
          bid_attempt_price: "DESC",
        },
      });

      if (!newBid) {
        throw new BadRequestException('Invalid bid')
      }

      const user = await this.usersRepository.findOneBy({ id: userId });

      // Payback user balance
      user.temporary_hold -= newBid.bid_attempt_price;
      if (user.temporary_hold == 0) {
        user.temporary_hold = null;
      }
      await this.usersRepository.save(user);
      return { payback: true };
    }
  }

  findAll(): Promise<Bid[] | []> {
    return this.bidsRepository.find();
  }
}
