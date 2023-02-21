import { Document, Schema, model } from "mongoose";

export interface IDevice {
    Name: string,
    DeviceId: string,
    DeviceType: string,
    Topic: string,
    Ip?: string,
    Room?: string
    GroupTopic?: string,
}
    // Type?: string,
    // Commands?: ICommand[]

export interface IDeviceModel extends IDevice, Document { }

const deviceSchema = new Schema<IDevice>({
    Name: { type: String, required: true },
    Topic: { type: String, required: true },
    DeviceId: { type: String, required: true },
    GroupTopic: { type: String, required: false },
    Room: { type: String, required: false },
    Ip: { type: String, required: false },
},
{
    timestamps: true,
        versionKey: false
}
);
export default model<IDeviceModel>('Device', deviceSchema);