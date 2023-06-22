import { Reflector } from '@nestjs/core';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppUser } from '../api/users/entities/appuser.entity';
import { jwtSecret, IS_PUBLIC_KEY } from 'src/ultilities/constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(AppUser)
        private usersRepository: Repository<AppUser>,
        private jwtService: JwtService,
        private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtSecret
                }
            );
            request['user'] = payload;
            const user = await this.usersRepository.findOneBy({ id: payload.sub });
            if (!user || (user && !user.refreshToken)) {
                throw new UnauthorizedException();
            }
        } catch (error) {
            if (error.expiredAt) {
                throw new ForbiddenException('Token Expired');
            } else {
                throw new UnauthorizedException();
            }
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}