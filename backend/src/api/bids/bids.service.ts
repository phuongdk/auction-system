import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Bid } from 'src/api/bids/entities/bid.entity';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
    private dataSource: DataSource
  ) { }

  async createBid(
    userId: string,
    productId: string,
    bid_attempt_amount: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      await queryRunner.commitTransaction();
      // const bid = this.bidsRepository.create({ userId, productId, bid_attempt_amount });
      // return this.bidsRepository.save(bid);
    } catch (error) {
      console.log('2', error)
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Bid[] | []> {
    return this.bidsRepository.find();
  }
}
