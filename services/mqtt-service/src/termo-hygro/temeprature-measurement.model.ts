import { Document, Schema, model } from "mongoose";

export interface ITemperatureMeasurement {
    Timestamp: number,
    Temperature: number,
    DeviceId: string,
    DeviceName: string,
    Placement: string,
}

export interface ITemperatureMeasurementModel extends ITemperatureMeasurement, Document { }

const temperatureMeasurementSchema = new Schema<ITemperatureMeasurement>({
    Timestamp: { type: Number, required: true },
    Temperature: { type: Number, required: true, lowercase: true },
    DeviceId: { type: String, required: true },
    DeviceName: { type: String, required: false, lowercase: true },
    Placement: { type: String, required: false },
},
    {
        timestamps: true,
        versionKey: false
    }
);
export default model<ITemperatureMeasurementModel>('TemperatureMeasurements', temperatureMeasurementSchema);