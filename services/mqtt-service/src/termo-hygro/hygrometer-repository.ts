import { injectable } from "inversify";
import HumidityMeasurements, { IHumidityMeasurement } from './humidity-measurement.model';

export interface IHygrometerRepository {
    saveMeasurement(measurement: IHumidityMeasurement): Promise<void>;
}

@injectable()
export class HygrometerRepository implements IHygrometerRepository {
    private hygrometerReading;
    constructor() {
        this.hygrometerReading = HumidityMeasurements;
    }

    public async saveMeasurement(measurement: IHumidityMeasurement): Promise<void> {
        const reading = new this.hygrometerReading(measurement);
        await reading.save();
        // console.log("lightFromDb", lightFromDb);
        // const updatedInfo = { ...lightFromDb, ...lightToUpdate };
        // console.log("updatedLight", updatedInfo);
    }
}
