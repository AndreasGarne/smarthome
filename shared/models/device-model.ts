import { Document, Schema, model } from "mongoose";

export interface IDevice {
    Name?: string,
    DeviceId: string,
    IEEEAddr?: string,
    ModelId?: string,
    Manufacturer?: string,
    DeviceType: string,
    Topic?: string,
    Ip?: string,
    Room?: string
    GroupTopic?: string,
    Time?: string,
    Uptime?: string,
    UptimeSec?: number,
    Heap?: number,
    SleepMode?: string,
    Sleep?: number,
    LoadAvg?: number,
    MqttCount?: number,
    Endpoint?: number,
    LinkQuality?: number,
    Reachable?: boolean,
    LastSeen?: number,
    LastSeenEpoch?: number
}

export interface IDeviceModel extends IDevice, Document { }

const deviceSchema = new Schema<IDevice>({
    Name: { type: String, required: true },
    DeviceId: { type: String, required: true, lowercase: true },
    DeviceType: { type: String, required: true },
    IEEEAddr: { type: String, required: false, lowercase: true },
    ModelId: { type: String, required: false },
    Manufacturer: { type: String, required: false },
    Topic: { type: String, required: true },
    Ip: { type: String, required: false },
    Room: { type: String, required: false },
    GroupTopic: { type: String, required: false },
    Time: { type: String, required: false },
    Uptime: { type: String, required: false },
    UptimeSec: { type: Number, required: false },
    Heap: { type: Number, required: false },
    SleepMode: { type: String, required: false },
    Sleep: { type: Number, required: false },
    LoadAvg: { type: Number, required: false },
    MqttCount: { type: Number, required: false },
    Endpoint: { type: Number, required: false },
    LinkQuality: { type: Number, required: false },
    Reachable: { type: Boolean, required: false },
    LastSeen: { type: Number, required: false },
    LastSeenEpoch: { type: Number, required: false }
},
    {
        timestamps: true,
        versionKey: false
    }
);
export default model<IDeviceModel>('Device', deviceSchema);