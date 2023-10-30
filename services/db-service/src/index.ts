import { connect } from 'mongoose';
import { create } from '@smarthome/logger';
import dotenv from 'dotenv';
dotenv.config();

import { createConfig } from "./config";
import { createApp } from './app';

const config = createConfig();
const logger = create(config.LogLevel);
const app = createApp(config, logger);

connect(config.MongoURL, {
    authSource: config.MongoAuthSource,
    user: config.MongoUser,
    pass: config.MongoPassword,
}).then(() => {
    logger.log("info", "mongo connected");
    app.start();
}).catch((error) => { logger.log("error", error); });
