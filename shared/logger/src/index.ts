import * as winston from 'winston'
import { createLogger, format, transports,  } from 'winston';
const { combine, timestamp, printf } = format;

const create = (logLevel: string): winston.Logger => {
    return createLogger({
        level: logLevel,
        format: combine(
            timestamp(),
            myFormat
        ),
        transports: [new transports.Console()],
    });
}

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
export type SmarthomeLogger = winston.Logger;
export { create };