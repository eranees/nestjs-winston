import {
  Injectable,
  Logger as NestLogger,
  Scope,
  Inject,
} from '@nestjs/common';
import * as winston from 'winston';
import * as cliColor from 'cli-color';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends NestLogger {
  private logger: winston.Logger;

  constructor(@Inject('APP_NAME') readonly context?: string) {
    super(context);
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(
              ({ level, message, timestamp, label, context, stack }) => {
                const filePosition = stack
                  ? ` (${stack
                      .split('\n')[3]
                      .trim()
                      .replace(/^\(|\)$/g, '')})`
                  : '';
                return `${timestamp} [${label}] ${level}: [${context}] ${message}${filePosition}`;
              },
            ),
          ),
        }),
      ],
    });
  }

  info(message: any) {
    this.logger.info(cliColor.green.bold(`${message}`), {
      context: this.context,
    });
  }

  error(message: any, trace: any) {
    this.logger.error(cliColor.red.bold(`${message}`), {
      context: this.context,
      trace,
    });
  }

  warn(message: any) {
    this.logger.warn(cliColor.yellow.bold(`${message}`), {
      context: this.context,
    });
  }

  debug(message: any) {
    this.logger.debug(cliColor.white.bold(`${message}`), {
      context: this.context,
    });
  }

  verbose(message: string) {
    this.logger.debug(cliColor.blue.bold(`${message}`), {
      context: this.context,
    });
  }
}
