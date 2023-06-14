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
    bid_attempt_amount: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const product = await this.productsRepository.findOneBy({ id: productId, status: 'published' });

    if (userId === product.userId) {
      throw new BadRequestException('Cannot bid your item');
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
    let bid = null;

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
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
      )
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
          bid_attempt_price: bid_attempt_amount
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
      }
      return result;
    } catch (error) {
      console.log('error transaction', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Bid[] | []> {
    return this.bidsRepository.find();
  }
}
