import * as winston from 'winston';
declare const create: (logLevel: string) => winston.Logger;
export type SmarthomeLogger = winston.Logger;
export { create };
