import { Document, Schema, model } from "mongoose";

export interface ICommand {
    CommandType: string,
    Name : string,
    Payload : string,
    Type : string,
    Validation : string,
    Arguments : string,
    TopicPrefix : string,
    TopicSuffix : string
}

export interface ICommandModel extends ICommand, Document {}

const commandSchema = new Schema<ICommand>({
    CommandType: { type: String, required: true },
    Name: { type: String, required: true },
    Payload: { type: String, required: true },
    Type: { type: String, required: true },
    Validation: { type: String, required: false },
    Arguments: { type: String, required: false },
    TopicPrefix: { type: String, required: true },
    TopicSuffix: { type: String, required: true },
},
    {
        timestamps: true,
        versionKey: false
    }
);
export default model<ICommandModel>('Command', commandSchema);