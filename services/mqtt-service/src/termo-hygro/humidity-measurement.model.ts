import { Document, Schema, model } from "mongoose";

export interface IHumidityMeasurement {
    Timestamp: number,
    Humidity: number,
    DeviceId: string,
    DeviceName: string,
    Placement: string,
}

export interface IHumidityMeasurementModel extends IHumidityMeasurement, Document { }

const humidityMeasurementSchema = new Schema<IHumidityMeasurement>({
    Timestamp: { type: Number, required: true },
    Humidity: { type: Number, required: true, lowercase: true },
    DeviceId: { type: String, required: true },
    DeviceName: { type: String, required: false, lowercase: true },
    Placement: { type: String, required: false },
},
    {
        timestamps: true,
        versionKey: false
    }
);
export default model<IHumidityMeasurementModel>('HumidityMeasurements', humidityMeasurementSchema);