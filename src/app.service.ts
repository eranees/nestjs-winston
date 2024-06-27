import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor() {}

  private readonly logger = new LoggerService('AppService');

  getHello(): string {
    this.logger.log('This is an informational log.');
    return 'Hello World!';
  }
}
