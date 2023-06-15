import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUser } from 'src/api/users/entities/appuser.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(AppUser)
    private usersRepository: Repository<AppUser>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) { }

  findAll(): Promise<Product[] | []> {
    return this.productsRepository.find();
  }

  async createItem(userId: string, name: string, price: number, time_window: number): Promise<Product | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    price = parseFloat((price).toFixed(2));
    const product = this.productsRepository.create({ name, price, bid_price: price, status: 'unpublished', time_window, user });
    return this.productsRepository.save(product);
  }

  findBidItems(): Promise<Product[] | null> {
    return this.productsRepository.find({
      where: {
        status: 'published'
      }
    });
  }

  findMyItems(id: string): Promise<Product[] | null> {
    return this.productsRepository.find({
      relations: {
        user: true
      },
      where: {
        user: {
          id,
        },
        status: 'unpublished'
      }
    });
  }

  async refreshItem(id: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({
      id
    });
  }

  async publishItem(userId: string, productId: string, action: string, bid_phase: number): Promise<Product | null> {
    const result = await this.productsRepository.update(
      { id: productId, user: { id: userId } },
      { status: action, bid_phase, published_at: new Date() });

    if (result && result.affected == 1) {
      const product = await this.productsRepository.findOne({
        where: { id: productId, user: { id: userId } },
      });
      return product;
    }
    return null;
  }

  deleteItem(id: string): any {
    return this.productsRepository.delete(id);
  }
}
