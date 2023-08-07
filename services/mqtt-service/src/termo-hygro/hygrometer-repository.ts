import { inject, injectable } from "inversify";
import HumidityMeasurements, { IHumidityMeasurement } from './humidity-measurement.model';
import { TYPES } from "../injection";
import { ILogger } from "../utilities/logger";

export interface IHygrometerRepository {
    saveMeasurement(measurement: IHumidityMeasurement): Promise<void>;
}

@injectable()
export class HygrometerRepository implements IHygrometerRepository {
    private hygrometerReading;
    constructor(
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) {
        this.hygrometerReading = HumidityMeasurements;
    }

    public async saveMeasurement(measurement: IHumidityMeasurement): Promise<void> {
        const reading = new this.hygrometerReading(measurement);
        await reading.save();
        // this.logger.log("debug", "lightFromDb", lightFromDb);
        // const updatedInfo = { ...lightFromDb, ...lightToUpdate };
        // this.logger.log("debug", "updatedLight", updatedInfo);
    }
}
