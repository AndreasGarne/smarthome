import { IMqttRouter } from './routes';
import dotenv from 'dotenv';
import { container } from './injection/inversify.config';
import { TYPES } from './injection';
import { ILightController } from './controllers';
import { connect } from 'mongoose';
import { IMongoConfiguration } from './models';
import { ILogger } from './utilities/logger';
dotenv.config();

const mongoConfig = container.get<IMongoConfiguration>(TYPES.IConfiguration);
const logger = container.get<ILogger>(TYPES.ILogger);

connect(mongoConfig.MongoURL, {
    authSource: mongoConfig.MongoAuthSource,
    user: mongoConfig.MongoUser,
    pass: mongoConfig.MongoPassword,
}).then((result) => {
    logger.log("info", "mongo connected");
    container.get<IMqttRouter>(TYPES.IMqttRouter);
}).catch((error) => { logger.log("error", error); });

container.get<"ILightController">(TYPES["ILightController"]);
