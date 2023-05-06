import { ILight } from "../models";
import { ILightResponse } from "../models/light-response";
import { Document } from "mongoose";

export const MapLightToLightResponse = (lights: ILight[]): ILightResponse[] => {
    return lights.map<ILightResponse>((light) => ({
            Id: (light as unknown as Document)._id,
            Name: light.Name || "N/A",
            DeviceId: light.DeviceId || "N/A",
            ModelId: light.ModelId || "N/A",
            Manufacturer: light.Manufacturer || "N/A",
            Ip: light.Ip || "N/A",
            Room: light.Room || "N/A",
            UptimeSec: light.UptimeSec || -1,
            LinkQuality: light.LinkQuality || -1,
            Reachable: light.Reachable || false,
            LastSeen: light.LastSeen || -1,
            LastSeenEpoch: light.LastSeen || -1,
            Dimmer: light.Dimmer || -1,
            Color: light.Color || "N/A",
            White: light.White || -1,
            MinCT: light.MinCT || -1,
            MaxCT: light.MaxCT || -1,
            CT: light.CT || -1,
            Commands: light.Commands?.map(command => command.CommandType) || [],
            Power: light.POWER || "N/A"
    }));
}