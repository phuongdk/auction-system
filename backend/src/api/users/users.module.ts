import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './components/users.controller';
import { UsersService } from './components/users.service';
import { AuthService } from './components/auth.service';
import { AppUser } from './entities/appuser.entity';
import { jwtSecret } from 'src/ultilities/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppUser]),
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [UsersController],
  providers: [AuthService, UsersService]
})
export class UsersModule { }
