import { connect } from 'mongoose';
import { create } from '@smarthome/logger';
import dotenv from 'dotenv';
dotenv.config();

import { createMqttApp } from "./app";
import { createConfig } from "./config";

const config = createConfig();
const logger = create(config.LogLevel);

connect(config.MongoURL, {
    authSource: config.MongoAuthSource,
    user: config.MongoUser,
    pass: config.MongoPassword,
}).then(() => {
    logger.log("info", "mongo connected");
    const app = createMqttApp(config, logger);
    app.start();
}).catch((error) => { console.log("error", error); });
