import { Schema } from "mongoose";
import { deviceModel } from "./device";
import { Remote } from "../controllers/storage-models";

const remoteSchema = new Schema<Remote>(
  {
    Actions: { type: Schema.Types.Mixed, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const remoteModel = deviceModel.discriminator("Remote", remoteSchema);
