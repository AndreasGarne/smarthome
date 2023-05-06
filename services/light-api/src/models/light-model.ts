import { Document, Schema, model } from "mongoose";
import { IDevice } from "./device-model";
import Device from './device-model';

export interface ILight extends IDevice {
    POWER?: string,
    Dimmer?: number,
    Color?: string,
    HSBColor?: string,
    X?: number,
    Y?: number,
    ColorMode?: number,
    RGB?: string,
    RGBb?: string,
    White?: number,
    MinCT?: number,
    MaxCT?: number,
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
    X: { type: Number, required: false },
    Y: { type: Number, required: false },
    ColorMode: { type: Number, required: false },
    RGB: { type: String, required: false },
    RGBb: { type: String, required: false },    
    White: { type: Number, required: false },
    MinCT: { type: Number, required: false },
    MaxCT: { type: Number, required: false },
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