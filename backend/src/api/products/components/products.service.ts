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

  async createItem(userId, name, price, time_window) {
    const user = await this.usersRepository.findOneBy({ id: userId });
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
        }
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
