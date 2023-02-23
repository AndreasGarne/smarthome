import { Document, Schema, model } from "mongoose";
import { IDevice } from "./device-model";
import Device from './device-model';

export interface ILight extends IDevice {
    POWER?: string,
    Dimmer?: number,
    Color?: string,
    HSBColor?: string,
    White?: number,
    CT?: number,
    Channel?: number[],
    Scheme?: number,
    Fade?: string,
    Speed?: number,
    LedTable?: string,    
    Commands?: any[]
}

export interface ILightModel extends ILight, Document { }

const lightSchema = new Schema<ILight>({
    POWER: { type: String, required: false },
    Dimmer: { type: Number, required: false },
    Color: { type: String, required: false },
    HSBColor: { type: String, required: false },
    White: { type: Number, required: false },
    CT: { type: Number, required: false },
    Channel: [{ type: Number, required: false }],
    Scheme: { type: Number, required: false },
    Fade: { type: String, required: false },
    Speed: { type: Number, required: false },
    LedTable: { type: String, required: false },  
    Commands: [{ type: Schema.Types.ObjectId, required: false, ref: "Command" }],
},
{
    timestamps: true,
        versionKey: false
}
);
export default Device.discriminator('Light', lightSchema);