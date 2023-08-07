import { create } from '@smarthome/logger';
import dotenv from 'dotenv';
dotenv.config();

import { createConfig } from './config';
import { createMqttApp } from './app';

const config = createConfig();
const logger = create(config.LogLevel);
const app = createMqttApp(config, logger);
app.start();
logger.log('info', 'automation service now listening for events');