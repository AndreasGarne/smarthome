import { connect } from 'mongoose';
import { Server } from './server/server';
import { iocContainer } from './dependency-injection/ioc';
import dotenv from 'dotenv';
import { TYPES } from './dependency-injection';
import { IMongoConfiguration } from './models';
dotenv.config();

const mongoConfig = iocContainer.get<IMongoConfiguration>(TYPES.IConfiguration);

connect(mongoConfig.MongoURL, {
    authSource: mongoConfig.MongoAuthSource,
    user: mongoConfig.MongoUser,
    pass: mongoConfig.MongoPassword,
}).then(() => {
    const server = new Server();
    server.start();
}).catch((error) => { console.log(error); });

