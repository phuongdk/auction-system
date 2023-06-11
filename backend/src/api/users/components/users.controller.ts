import { Controller, Get, Post, Body, Param, Delete, UseFilters } from '@nestjs/common';
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
  @Post('/signup')
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
  @Post('/signin')
  async signin(@Body() body: LoginUserDto) {
    const user = await this.authService.signin(body.email, body.password);
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
