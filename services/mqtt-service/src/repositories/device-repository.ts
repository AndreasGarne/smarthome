import { injectable } from "inversify";
import { IDevice } from "@smarthome/models";
import Device from '@smarthome/models/device-model';

export interface IDeviceRepository {
    getByDeviceId(deviceId: string): Promise<IDevice | null>;
}

@injectable()
export class DeviceRepository implements IDeviceRepository {
    private device;
    constructor() {
        this.device = Device;
    }

    public async getByDeviceId(deviceId: string): Promise<IDevice | null> {
        console.log(deviceId);
        const device = await this.device.findOne<IDevice>({ DeviceId: deviceId.toLowerCase() });
        return device;
    }
}

