import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  first_name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  last_name: string;
}

