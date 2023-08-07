import { Document, Schema, model } from "mongoose";
import { Command } from "../controllers/storage-models";

export interface CommandModel extends Command, Document { }

export const commandSchema = new Schema<Command>({
    CommandType: { type: String, required: false },
    Name: { type: String, required: true },
    Payload: { type: String, required: true },
    Type: { type: String, required: true },
    Validation: { type: String, required: true },
    Arguments: { type: String, required: true },
    TopicPrefix: { type: String, required: true },
    TopicSuffix: { type: String, required: true },
    IsXYColour: { type: String, required: false },
    IsZigbee: { type: String, required: false },
    IsTasmota: { type: String, required: false },
    ZigbeeCommand: { type: String, required: false },
},
    {
        timestamps: true,
        versionKey: false
    }
);
