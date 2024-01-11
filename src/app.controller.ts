import { Controller, Get, Headers, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Headers() headers: any): string {
    return this.appService.getHello();
  }
}
