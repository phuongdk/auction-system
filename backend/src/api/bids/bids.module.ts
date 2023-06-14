import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { AppUser } from '../users/entities/appuser.entity';
import { Product } from '../products/entities/product.entity';
import { Bid } from './entities/bid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppUser, Product, Bid])],
  controllers: [BidsController],
  providers: [BidsService]
})
export class BidsModule {}
