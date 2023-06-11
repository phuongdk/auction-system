import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

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

      const payload = { sub: user.id };
      const access_token = await this.jwtService.signAsync(payload);

      return {access_token};
    }
}