import { inject, injectable } from "inversify";
import { TYPES } from "../injection";
import { ITemperatureMeasurement } from "./temeprature-measurement.model";
import { IThermometerRepository } from "./thermometer-repository";
import { IHumidityMeasurement } from "./humidity-measurement.model";
import { IHygrometerRepository } from "./hygrometer-repository";

export interface IThermoHygroService {
    saveTemperatureMeasurement(measurement: ITemperatureMeasurement): Promise<void>;
    saveHygrometerMeasurement(measurement: IHumidityMeasurement): Promise<void>;
}

@injectable()
export class ThermoHygroService implements IThermoHygroService {
    constructor(
        @inject(TYPES.IThermometerRepository) private readonly thermometerRepo: IThermometerRepository,
        @inject(TYPES.IHygrometerRepository) private readonly hygrometerRepo: IHygrometerRepository,
    ) { }

    public async saveTemperatureMeasurement(measurement: ITemperatureMeasurement): Promise<void> {
        return await this.thermometerRepo.saveMeasurement(measurement);
    }

    public async saveHygrometerMeasurement(measurement: IHumidityMeasurement): Promise<void> {
        return await this.hygrometerRepo.saveMeasurement(measurement);
    }
}