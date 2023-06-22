import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AppUser } from '../entities/appuser.entity';
import { UsersService } from './users.service';
import {
  jwtSecret,
  jwtRefreshSecret,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME
} from 'src/ultilities/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AppUser)
    private usersRepository: Repository<AppUser>,
    private usersService: UsersService,
    private jwtService: JwtService) { }

  async signup(email: string, password: string, first_name: string, last_name: string) {
    // Check if email is in use
    const user = await this.usersService.findEmail(email);

    if (user) {
      throw new BadRequestException('Email in use');
    }

    // Hash the users password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = await this.usersService.create(email, hash, first_name, last_name);
    return newUser;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findEmail(email);

    if (!user) {
      throw new BadRequestException('Incorrect email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Incorrect email or password');
    }

    const result = this.handleToken(user);
    return result;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: jwtRefreshSecret
        }
      );

      const user = await this.usersRepository.findOneBy({ id: payload.sub });

      if (!user.refreshToken) {
        throw new UnauthorizedException();
      }

      const result = this.handleToken(user);
      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async handleToken(user: AppUser) {
    const payload = { sub: user.id };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtRefreshSecret,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    // Hash the refresh token
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(refresh_token, salt);

    user.refreshToken = hash;
    await this.usersRepository.save(user);

    return { access_token, refresh_token };
  }
}