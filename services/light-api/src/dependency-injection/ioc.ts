import 'reflect-metadata';
import { Container, decorate, injectable } from 'inversify';
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from 'tsoa';

import { 
    ILightRepository,
    LightRepository
} from '../repositories';
import { 
    ILightService,
    LightService
} from '../services';
import { Configuration } from '../configuration';
import { ILogger, WinstonLogger } from '../logger';
import { TYPES } from '../dependency-injection';
import { IMqttClient, MqttClient } from '../mqtt/mqtt-publisher';
import { IConfiguration } from '../models';

// Create a new container tsoa can use
const iocContainer = new Container();

iocContainer.bind<ILightRepository>(TYPES.ILightRepository).to(LightRepository).inSingletonScope();
iocContainer.bind<ILightService>(TYPES.ILightService).to(LightService).inSingletonScope();
iocContainer.bind<IMqttClient>(TYPES.IMqttClient).to(MqttClient).inSingletonScope();
iocContainer.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration).inSingletonScope();
iocContainer.bind<ILogger>(TYPES.ILogger).to(WinstonLogger).inSingletonScope();


decorate(injectable(), Controller); // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule());

export { iocContainer };