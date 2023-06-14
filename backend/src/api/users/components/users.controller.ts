import { Controller, Request, Get, Post, Body, UseFilters, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { Public } from 'src/ultilities/constants';
import { LoginExceptionFilter } from '../filters/auth-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService, private usersService: UsersService) { }

  @Public()
  @Post('signup')
  async create(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.first_name,
      body.last_name
    );
    return user;
  }

  @Public()
  @UseFilters(new LoginExceptionFilter())
  @Post('signin')
  async signin(@Body() body: LoginUserDto) {
    const user = await this.authService.signin(body.email, body.password);
    return user;
  }

  @Get('getAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  findMe(@Request() request: Request) {
    const id = request['user'].sub;
    return this.usersService.findMe(id);
  }

  @Post('deposit')
  deposit(@Request() request: Request, @Body() body) {
    if (typeof body.amount !== 'number') {
      throw new BadRequestException('Invalid data format');
    }

    if (typeof body.amount === 'number' && (body.amount < 1 || body.amount > 1000)) {
      throw new BadRequestException('Invalid number');
    }

    const id = request['user'].sub;
    return this.usersService.deposit(id, body.amount);
  }
}