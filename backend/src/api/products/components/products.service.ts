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
    private productsRepository: Repository<Product>,
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

  refreshItem(id: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({
      id
    });
  }

  publishItem(userId: string, productId: string, action: string): any {
    return this.productsRepository.update(
      { id: productId, user: { id: userId } },
      { status: action });
  }

  deleteItem(id: string): any {
    return this.productsRepository.delete(id);
  }
}
