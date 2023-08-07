import mqtt from "mqtt";
import { create } from '@smarthome/logger';
import dotenv from 'dotenv';
dotenv.config();

import { createConfig } from "./config";
import { createApp } from './app';
import { createMqttPublisher } from './mqtt-app';

const config = createConfig();
const logger = create(config.LogLevel);

(async () => {
    const mqttPublisher = await createMqttPublisher(config, logger);
    const app = createApp(config, logger, mqttPublisher);
    app.start();
})();

// hp  78
// sta 78
// wei 68
// mel 77