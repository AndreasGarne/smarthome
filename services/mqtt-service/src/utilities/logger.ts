import { inject, injectable } from 'inversify';
import { createLogger, format, transports } from 'winston';
import * as winston from 'winston';
import { ILoggingConfiguration } from '../models';
import { TYPES } from '../injection';
const { combine, timestamp, printf } = format;


export interface ILogger {
    log(level: string, message: any): void;
}

@injectable()
export class Logger implements ILogger {
    private _logger: winston.Logger;


    constructor(
        @inject(TYPES.IConfiguration) private readonly config: ILoggingConfiguration,
    ) {
        const myFormat = printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        });

        this._logger = createLogger({
            level: this.config.LogLevel,
            format: combine(
                timestamp(),
                myFormat
            ),
            transports: [new transports.Console()],
        });
    }

    public log(level: string, message: any): void {
        this._logger.log(level, message);
    }
}
