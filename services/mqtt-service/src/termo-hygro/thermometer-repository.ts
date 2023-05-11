import { injectable } from "inversify";
import TemperatureMeasurements, { ITemperatureMeasurement } from './temeprature-measurement.model';

export interface IThermometerRepository {
    saveMeasurement(measurement: ITemperatureMeasurement): Promise<void>;
}

@injectable()
export class ThermometerRepository implements IThermometerRepository {
    private thermometerReading;
    constructor() {
        this.thermometerReading = TemperatureMeasurements;
    }

    public async saveMeasurement(measurement: ITemperatureMeasurement): Promise<void> {
        const reading = new this.thermometerReading(measurement);
        await reading.save();
        // console.log("lightFromDb", lightFromDb);
        // const updatedInfo = { ...lightFromDb, ...lightToUpdate };
        // console.log("updatedLight", updatedInfo);
    }
}
