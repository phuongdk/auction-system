import { IsString, MinLength, MaxLength, Min, Max, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(1000)
  price: number;

  @IsNumber()
  time_window: number;
}