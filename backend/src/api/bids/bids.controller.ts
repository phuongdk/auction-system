import { Controller, Request, Get, Post, Body } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  create(@Request() request: Request, @Body() body: CreateBidDto) {
    const userId = request['user'].sub;
    return this.bidsService.createBid(
      userId,
      body.productId,
      body.bid_attempt_amount
      );
  }

  @Get('getAll')
  findAll() {
    return this.bidsService.findAll();
  }
}
