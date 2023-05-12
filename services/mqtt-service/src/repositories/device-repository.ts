import { inject, injectable } from "inversify";
import { IDevice } from "../models";
import Device from '../models/device-model';
import { TYPES } from "../injection";
import { ILogger } from "../utilities/logger";

export interface IDeviceRepository {
    getByDeviceId(deviceId: string): Promise<IDevice | null>;
    getDeviceTypeById(deviceId: string): Promise<string>;
}

@injectable()
export class DeviceRepository implements IDeviceRepository {
    private device;
    constructor(
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) {
        this.device = Device;
    }

    public async getByDeviceId(deviceId: string): Promise<IDevice | null> {
        const device = await this.device.findOne<IDevice>({ DeviceId: deviceId.toLowerCase() });
        this.logger.log("debug", `Found device: ${device?.DeviceType}`);
        return device;
    }

    public async getDeviceTypeById(deviceId: string): Promise<string> {
        const device = await this.device.findOne<IDevice>({ DeviceId: deviceId.toLowerCase() });
        this.logger.log("debug", `Found device: ${device?.DeviceType}`);
        return device ? device.DeviceType: '';
    }
}
