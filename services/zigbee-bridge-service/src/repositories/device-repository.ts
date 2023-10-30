import { configuration } from "../config";
import { CreateDeviceRequestV1, Device, GetDeviceResponseV1 as StoredDevice } from "./storage-models";

export interface DeviceRepository {
  get: (id: string, type: string) => Promise<StoredDevice | null>;
  add: (device: CreateDeviceRequestV1) => Promise<StoredDevice>;
  update: (device: Device, id: string) => Promise<StoredDevice>;
}
export const createDeviceRepository = (
  config: configuration
): DeviceRepository => {
  const get = async (id: string, type?: string): Promise<StoredDevice | null> => {
    const response = await fetch(
      `${config.StorageApiUrl}/v1/devices/${id}${type ? `?type=${type}` : ""}`
    );
    if (response.status === 404) {
      return null;
    }

    return await response.json();
  };

  const add = async (device: CreateDeviceRequestV1): Promise<StoredDevice> => {
    const response = await fetch(`${config.StorageApiUrl}/v1/devices`, {
      method: "POST",
      body: JSON.stringify(device),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  const update = async (device: Device, id: string): Promise<StoredDevice> => {
    const response = await fetch(`${config.StorageApiUrl}/v1/devices/${id}`, {
      method: "PATCH",
      body: JSON.stringify(device),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  return {
    get,
    add,
    update,
  };
};
