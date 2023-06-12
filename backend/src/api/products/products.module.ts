import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './components/products.controller';
import { ProductsService } from './components/products.service';
import { AppUser } from '../users/entities/appuser.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppUser, Product])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
