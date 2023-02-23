// import { injectable } from "inversify";
// import { Schema, model, connect, Model } from 'mongoose';
// import { ICommand, ICommandModel } from "../models";

// export interface ICommandRepository {
//     getAll(): Promise<ILight[]>;
//     getById(id: string): Promise<ILight>;
//     add(light: ILight): Promise<void>;
//     removeById(id: string): Promise<void>;
// }

// @injectable()
// export class LightRepository implements ILightRepository {
//     private lightSchema: Schema<ILight>;
//     private Light: Model<ILightModel>;

//     constructor() {
//         this.lightSchema = new Schema<ILight>({
//             Name: { type: String, required: true },
//             Topic: { type: String, required: true },
//             MacAddress: { type: String, required: true },
//             GroupTopic: { type: String, required: false },
//             Room: { type: String, required: false },
//             Type: { type: String, required: false },
//             Ip: { type: String, required: false },
//             Commands: [{ Name: String, FullTopic: String, Payload: String }],
//         },
//             {
//                 timestamps: true,
//                 versionKey: false
//             }
//         );
//         this.Light = model<ILightModel>('Light', this.lightSchema);
//     }