import { IMqttRouter } from './routes';
import dotenv from 'dotenv';
import { container } from './injection/inversify.config';
import { TYPES } from './injection';
dotenv.config();

const mqttRouter = container.get<IMqttRouter>(TYPES.IMqttRouter);