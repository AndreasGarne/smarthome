import { Document, Schema, model } from "mongoose";
import { IDevice } from "./device-model";
import Device from './device-model';

export interface ILight extends IDevice {
    // Name: string,
    // DeviceId: string,
    // Topic: string,
    // Ip?: string,
    // GroupTopic?: string,
    // Room?: string,
    // Type?: string,
    Commands?: any[]
}

export interface ILightModel extends ILight, Document { }

const lightSchema = new Schema<ILight>({
    Name: { type: String, required: true },
    Topic: { type: String, required: true },
    DeviceId: { type: String, required: true },
    DeviceType: { type: String, required: false },
    GroupTopic: { type: String, required: false },
    Room: { type: String, required: false },
    Ip: { type: String, required: false },
    Commands: [{ type: Schema.Types.ObjectId, required: false, ref: "Command" }],
},
{
    timestamps: true,
        versionKey: false
}
);
export default Device.discriminator('Light', lightSchema);