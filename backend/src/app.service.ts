import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerHealthCheck(): string {
    console.log('Server is up and running...');
    return 'Server is up and running...';
  }
}
