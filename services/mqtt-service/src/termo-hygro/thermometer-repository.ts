import { inject, injectable } from "inversify";
import TemperatureMeasurements, { ITemperatureMeasurement } from './temeprature-measurement.model';
import { TYPES } from "../injection";
import { ILogger } from "../utilities/logger";

export interface IThermometerRepository {
    saveMeasurement(measurement: ITemperatureMeasurement): Promise<void>;
}

@injectable()
export class ThermometerRepository implements IThermometerRepository {
    private thermometerReading;
    constructor(
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) {
        this.thermometerReading = TemperatureMeasurements;
    }

    public async saveMeasurement(measurement: ITemperatureMeasurement): Promise<void> {
        const reading = new this.thermometerReading(measurement);
        await reading.save();
        // this.logger.log("debug", "lightFromDb", lightFromDb);
        // const updatedInfo = { ...lightFromDb, ...lightToUpdate };
        // this.logger.log("debug", "updatedLight", updatedInfo);
    }
}
