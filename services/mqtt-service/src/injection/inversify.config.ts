import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import {
    ILightController,
    LightController
} from "../controllers";
import { IMqttRouter, MqttRouter } from '../routes';
import { IConfiguration, Configuration } from "../configuration";
import { ILightService, LightService } from '../services';
import { ILightRepository, LightRepository } from '../repositories';

const container = new Container();
container.bind<ILightController>(TYPES.ILightController).to(LightController).inSingletonScope();
container.bind<IMqttRouter>(TYPES.IMqttRouter).to(MqttRouter).inSingletonScope();
container.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration).inSingletonScope();
container.bind<ILightService>(TYPES.ILightService).to(LightService).inSingletonScope();
container.bind<ILightRepository>(TYPES.ILightRepository).to(LightRepository).inSingletonScope();

export { container };