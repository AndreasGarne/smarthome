import { IMqttRouter } from './routes';
import dotenv from 'dotenv';
import { container } from './injection/inversify.config';
import { TYPES } from './injection';
import { ILightController } from './controllers';
import { connect } from 'mongoose';
import { IMongoConfiguration } from './models';
dotenv.config();

const mongoConfig = container.get<IMongoConfiguration>(TYPES.IConfiguration);

connect(mongoConfig.MongoURL, {
    authSource: mongoConfig.MongoAuthSource,
    user: mongoConfig.MongoUser,
    pass: mongoConfig.MongoPassword,
}).then((result) => {
    console.log("mongo connected");
    container.get<IMqttRouter>(TYPES.IMqttRouter);
}).catch((error) => { console.log(error); });

container.get<"ILightController">(TYPES["ILightController"]);


