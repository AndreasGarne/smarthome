import { inject, injectable } from "inversify";
import { TYPES } from "../injection";
import { IDeviceRepository } from "../repositories";
import { GetDeviceResponseV1 as StorageDevice } from "../models/storage-models";

export interface IDeviceService {
    getDeviceType(deviceId: string): Promise<string>;
    getByDeviceId(deviceId: string): Promise<StorageDevice | null>;
}

@injectable()
export class DeviceService implements IDeviceService {
    constructor(@inject(TYPES.IDeviceRepository) private readonly deviceRepo: IDeviceRepository) { }

    public async getDeviceType(deviceId: string): Promise<string> {
        return await this.deviceRepo.getDeviceTypeById(deviceId);
    }

    public async getByDeviceId(deviceId: string): Promise<StorageDevice | null> {
        return await this.deviceRepo.getByDeviceId(deviceId);
    }

}