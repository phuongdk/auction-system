import { IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateBidDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  @Max(100000)
  bid_attempt_amount: number;

  @IsNumber()
  @Min(1)
  @Max(1000)
  bid_phase: number;
}