import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(12)
  password: string;
}