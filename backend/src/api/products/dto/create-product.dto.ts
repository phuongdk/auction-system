import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNumber()
  price: number;

//   @IsNumber()
//   time_window: string;
}