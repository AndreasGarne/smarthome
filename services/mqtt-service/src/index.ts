import { IMqttRouter } from './routes';
import dotenv from 'dotenv';
import { container } from './injection/inversify.config';
import { TYPES } from './injection';
import { ILightController } from './controllers';
import { connect } from 'mongoose';
dotenv.config();

connect("mongodb://192.168.1.199:27014/smarthome", {
    authSource: "user-data",
    user: "smarthome-user",
    pass: "emohtrams",
}).then(() => {
    const mqttRouter = container.get<IMqttRouter>(TYPES.IMqttRouter);
})
    .catch((error) => { console.log(error); });

container.get<"ILightController">(TYPES["ILightController"]);


