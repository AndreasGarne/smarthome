import { MqttController } from './controllers';
import dotenv from 'dotenv';
import { Configuration } from './configuration';
dotenv.config();

const config = new Configuration();
new MqttController(config);