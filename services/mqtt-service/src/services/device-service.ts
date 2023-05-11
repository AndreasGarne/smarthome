import { inject, injectable } from "inversify";
import { TYPES } from "../injection";
import { IDeviceRepository } from "../repositories";

export interface IDeviceService {
    getDeviceType(deviceId: string): Promise<string>;
}

@injectable()
export class DeviceService implements IDeviceService {
    constructor(@inject(TYPES.IDeviceRepository) private readonly deviceRepo: IDeviceRepository) { }

    public async getDeviceType(deviceId: string): Promise<string> {
        return await this.deviceRepo.getDeviceTypeById(deviceId);
    }
}