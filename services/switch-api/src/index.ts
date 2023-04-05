import { createServer } from "./app";
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import { IMongoConfiguration, IServerConfiguration } from './models';
import { Configuration } from "./configuration";
dotenv.config();

const config = new Configuration();
const mongoConfig: IMongoConfiguration = config;
const serverConfig: IServerConfiguration = config;

connect(mongoConfig.MongoURL, {
    authSource: mongoConfig.MongoAuthSource,
    user: mongoConfig.MongoUser,
    pass: mongoConfig.MongoPassword,
}).then(() => {
    const server = createServer(serverConfig);
    server.listen(serverConfig.ApiPort, () => {
        console.log(`listening now to : ${serverConfig.ApiPort}`);
    });
}).catch((error) => { console.log(error); });





