import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import {
    ILightController,
    IZigbeeBridgeController,
    LightController,
    ZigbeeBridgeController,
} from "../controllers";
import { IMqttRouter, MqttRouter } from '../routes';
import { Configuration } from "../configuration";
import { DeviceService, IDeviceService, ILightService, LightService } from '../services';
import { DeviceRepository, IDeviceRepository, ILightRepository, LightRepository } from '../repositories';
import { IConfiguration } from "../models";
import { ITermoHygroController, TermoHygroController } from "../termo-hygro/termo-hygro-controller";
import { IThermoHygroService, ThermoHygroService } from "../termo-hygro/termo-hygro-service";
import { IThermometerRepository, ThermometerRepository } from "../termo-hygro/thermometer-repository";
import { HygrometerRepository, IHygrometerRepository } from "../termo-hygro/hygrometer-repository";
import { ILogger, Logger } from "../utilities/logger";

const container = new Container();
container.bind<ILightController>(TYPES.ILightController).to(LightController).inSingletonScope();
container.bind<IZigbeeBridgeController>(TYPES.IZigbeeBridgeController).to(ZigbeeBridgeController).inSingletonScope();
container.bind<IMqttRouter>(TYPES.IMqttRouter).to(MqttRouter).inSingletonScope();
container.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration).inSingletonScope();
container.bind<ILightService>(TYPES.ILightService).to(LightService).inSingletonScope();
container.bind<ILightRepository>(TYPES.ILightRepository).to(LightRepository).inSingletonScope();
container.bind<IDeviceRepository>(TYPES.IDeviceRepository).to(DeviceRepository).inSingletonScope();
container.bind<IDeviceService>(TYPES.IDeviceService).to(DeviceService).inSingletonScope();
container.bind<ITermoHygroController>(TYPES.ITermoHygroController).to(TermoHygroController).inSingletonScope();
container.bind<IThermoHygroService>(TYPES.IThermoHygroService).to(ThermoHygroService).inSingletonScope();
container.bind<IThermometerRepository>(TYPES.IThermometerRepository).to(ThermometerRepository).inSingletonScope();
container.bind<IHygrometerRepository>(TYPES.IHygrometerRepository).to(HygrometerRepository).inSingletonScope();
container.bind<ILogger>(TYPES.ILogger).to(Logger).inSingletonScope();

export { container };