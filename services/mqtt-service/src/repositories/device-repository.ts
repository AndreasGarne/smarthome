import { inject, injectable } from "inversify";
import { IDevice } from "../models";
import Device from "../models/device-model";
import { TYPES } from "../injection";
import { ILogger } from "../utilities/logger";
import { fetch } from "undici";
import { GetDeviceResponseV1 } from "../models/storage-models";

export interface IDeviceRepository {
  getByDeviceId(deviceId: string): Promise<GetDeviceResponseV1 | null>;
  getDeviceTypeById(deviceId: string): Promise<string>;
}

@injectable()
export class DeviceRepository implements IDeviceRepository {
  private device;
  constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
    this.device = Device;
  }

  public async getByDeviceId(deviceId: string): Promise<GetDeviceResponseV1 | null> {
    deviceId = deviceId.startsWith("0x") ? deviceId : `0x${deviceId}`;
    this.logger.log("debug", `Looking for device: ${deviceId}`);
    const reponse = await fetch(
      `http://localhost:3579/v1/devices/${deviceId.toLowerCase()}?type=DeviceId`
    );
    const device = await reponse.json() as GetDeviceResponseV1;
    this.logger.log("debug", `Found device: ${device?.DeviceType}`);
    return device;
  }

  public async getDeviceTypeById(deviceId: string): Promise<string> {
    deviceId = deviceId.startsWith("0x") ? deviceId : `0x${deviceId}`;
    this.logger.log("debug", `Looking for device: ${deviceId}`);
    const device = await this.device.findOne<IDevice>({
      DeviceId: deviceId.toLowerCase(),
    });
    this.logger.log("debug", `Found device: ${device?.DeviceType}`);
    return device ? device.DeviceType : "";
  }
}
