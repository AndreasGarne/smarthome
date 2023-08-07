import { SmarthomeLogger } from "@smarthome/logger";
import { configuration } from "../config";

export interface DeviceRepository {
    getDevices(): Promise<any>;
    getDevice(id: string): Promise<any>;
    addDevice(device: any): Promise<any>;
    updateDevice(id: string, device: any): Promise<any>;
    deleteDevice(id: string): Promise<any>;
};

export const createDeviceRepository = (logger: SmarthomeLogger, config: configuration): DeviceRepository => {
    const getDevices = async (): Promise<any> => {
        logger.log("info", `Getting devices from ${config.StorageApiUrl}`);
        try {
            // @ts-ignore
            const result = await fetch(`${config.StorageApiUrl}/v1/devices`);

            return await result.json();
        } catch (error) {
            logger.log("error", `Failed to get devices from ${config.StorageApiUrl}`);
        }
    };
    const getDevice = async (id: string): Promise<any> => {
    };
    const addDevice = async (device: any): Promise<any> => {
        logger.log("info", `Adding devices to ${config.StorageApiUrl}`);
        logger.log("info", JSON.stringify(device));
        try {
            // @ts-ignore
            const result = await fetch(`${config.StorageApiUrl}/v1/devices`, {
                method: "POST",
                body: JSON.stringify(device),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return await result.json();
        } catch (error) {
            logger.log("error", `Failed to get devices from ${config.StorageApiUrl}`);
        }
    };
    const updateDevice = async (id: string, device: any): Promise<any> => {
    };
    const deleteDevice = async (id: string): Promise<any> => {
    };

    return {
        getDevices,
        getDevice,
        addDevice,
        updateDevice,
        deleteDevice,
    };
};