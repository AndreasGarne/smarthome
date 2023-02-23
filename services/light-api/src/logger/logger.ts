import { injectable } from 'inversify';
import { createLogger, transports, format, Logger } from "winston";

export interface ILogger {
    logInfo(message: string): void;
    logDebug(message: string): void;
    logError(message: string): void;
}

@injectable()
export class WinstonLogger implements ILogger {
    private logger: Logger;
    constructor() {
        this.logger = createLogger({
            transports: [new transports.Console()],
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })
            ),
        });
    }

    public logInfo(message: string): void {
        this.logger.info(message);
    }

    public logDebug(message: string): void {
        this.logger.debug(message);
    }

    public logError(message: string): void {
        this.logger.error(message);
    }
}