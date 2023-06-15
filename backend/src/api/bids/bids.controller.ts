import { Controller, Request, Get, Post, Param, Body, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) { }

  @Post()
  create(@Request() request: Request, @Body() body: CreateBidDto) {
    const userId = request['user'].sub;
    return this.bidsService.createBid(
      userId,
      body.productId,
      body.bid_attempt_amount,
      body.bid_phase
    );
  }

  @Post('transfer/:id')
  transferItem(@Request() request: Request, @Param('id', ParseUUIDPipe) productId: string, @Body() body) {
    if (typeof body.bid_phase !== 'number') {
      throw new BadRequestException('Invalid data format');
    }

    const userId = request['user'].sub;
    return this.bidsService.transferItem(userId, productId, body.bid_phase);
  }

  @Get('getAll')
  findAll() {
    return this.bidsService.findAll();
  }
}
