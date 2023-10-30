import { IDevice } from "./device-model";

export interface RemoteControl extends IDevice {
    Actions?: Record<string, Record<string, RemoteCommand[]>>;
}

export interface RemoteCommand {
    id: string;
    parameters: string[];
  }