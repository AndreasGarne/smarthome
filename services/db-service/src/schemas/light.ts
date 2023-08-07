import { Schema } from "mongoose";
import { deviceModel } from './device';
import { ColourData, Light } from "../controllers/storage-models";

const colourSchema = new Schema<ColourData>({
    Color: { type: String, required: true },
    HSBColor: { type: String, required: function () { return (this as ColourData).HSBColor !== null } },
    X: { type: Number, required: function () { return (this as ColourData).X !== null } },
    Y: { type: Number, required: function () { return (this as ColourData).Y !== null; } },
    ColorMode: { type: Number, required: function () { return (this as ColourData).ColorMode !== null } },
    RGB: { type: String, required: true },
    RGBb: { type: String, required: function () { return (this as ColourData).RGBb !== null } },
}, { _id: false });

const lightSchema = new Schema<Light>({
    POWER: { type: String, required: false },
    Dimmer: { type: Number, required: false },
    Colour: { type: colourSchema, required: false },
    White: { type: Number, required: false },
    MinCT: { type: Number, required: false },
    MaxCT: { type: Number, required: false },
    CT: { type: Number, required: false },
    Channel: [{ type: Number, required: false }],
    Scheme: { type: Number, required: false },
    Fade: { type: String, required: false },
    Speed: { type: Number, required: false },
    LedTable: { type: String, required: false },
},
    {
        timestamps: true,
        versionKey: false
    });
export const lightModel = deviceModel.discriminator('Light', lightSchema);
