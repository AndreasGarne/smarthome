import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import {
    ILightController,
    LightController
} from "../controllers";
import { IMqttRouter, MqttRouter } from '../routes';
import { IConfiguration, Configuration } from "../configuration";

const container = new Container();
container.bind<ILightController>(TYPES.ILightController).to(LightController).inSingletonScope();
container.bind<IMqttRouter>(TYPES.IMqttRouter).to(MqttRouter).inSingletonScope();
container.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration).inSingletonScope();

export { container };