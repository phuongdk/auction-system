import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/ultilities/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  getServerHealthCheck(): string {
    return this.appService.getServerHealthCheck();
  }
}
