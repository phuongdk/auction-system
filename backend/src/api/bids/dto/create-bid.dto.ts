import { IsUUID, IsString, MinLength, MaxLength, Min, Max, IsNumber } from 'class-validator';

export class CreateBidDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  @Max(100000)
  bid_attempt_amount: number;
}