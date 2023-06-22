import { SetMetadata } from '@nestjs/common';

export const jwtSecret = 'AskW@04sT1';
export const jwtRefreshSecret = 'AskW@04sT1-refresh';

export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = '1h';
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = '1d';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);