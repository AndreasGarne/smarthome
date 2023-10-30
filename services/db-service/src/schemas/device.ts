import { Document, Schema, model } from "mongoose";
import { Device } from "../controllers/storage-models";
import { CommandModel, commandSchema } from "./command";

export interface DeviceModel extends Device, Document { }

const deviceSchema = new Schema<Device>({
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
    LastSeenEpoch: { type: Number, required: false },
    Commands: [{ type: Schema.Types.ObjectId, required: false, ref: "Command" }],
    Protocol: { type: String, required: false },
    ReceiveWhenIdle: { type: Boolean, required: false },
    PowerSource: { type: Boolean, required: false },
    Security: { type: Boolean, required: false },
    State: { type: String, required: false },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const deviceModel = model<DeviceModel>('Device', deviceSchema);
model<CommandModel>('Command', commandSchema);
