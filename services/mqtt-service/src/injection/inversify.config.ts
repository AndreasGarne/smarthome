import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import {
    ILightController,
    IZigbeeBridgeController,
    IZigbeeDeviceController,
    LightController,
    ZigbeeBridgeController,
    ZigbeeDeviceController
} from "../controllers";
import { IMqttRouter, MqttRouter } from '../routes';
import { IConfiguration, Configuration } from "../configuration";
import { ILightService, LightService } from '../services';
import { DeviceRepository, IDeviceRepository, ILightRepository, LightRepository } from '../repositories';

const container = new Container();
container.bind<ILightController>(TYPES.ILightController).to(LightController).inSingletonScope();
container.bind<IZigbeeDeviceController>(TYPES.IZigbeeDeviceController).to(ZigbeeDeviceController).inSingletonScope();
container.bind<IZigbeeBridgeController>(TYPES.IZigbeeBridgeController).to(ZigbeeBridgeController).inSingletonScope();
container.bind<IMqttRouter>(TYPES.IMqttRouter).to(MqttRouter).inSingletonScope();
container.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration).inSingletonScope();
container.bind<ILightService>(TYPES.ILightService).to(LightService).inSingletonScope();
container.bind<ILightRepository>(TYPES.ILightRepository).to(LightRepository).inSingletonScope();
container.bind<IDeviceRepository>(TYPES.IDeviceRepository).to(DeviceRepository).inSingletonScope();

export { container };