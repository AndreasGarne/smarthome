import { SmarthomeLogger } from "@smarthome/logger";
import { DeviceRepository } from "../repositories/device-repository";
import { MqttPublisher } from "../mqtt-app";

export interface DeviceService {
    getDevices(): Promise<any>;
    getDevice(id: string): Promise<any>;
    addDevice(device: any): Promise<any>;
    updateDevice(id: string, device: any): Promise<any>;
    deleteDevice(id: string): Promise<any>;
};

export const createDeviceService = (logger: SmarthomeLogger, deviceRepository: DeviceRepository, mqttPublisher: MqttPublisher): DeviceService => {
    const getDevices = async (): Promise<any> => {
        return await deviceRepository.getDevices();
    };
    const getDevice = async (id: string): Promise<any> => {
    };
    const addDevice = async (device: any): Promise<any> => {
        const result = await deviceRepository.addDevice(device);
        await mqttPublisher.publish("internal/automation", JSON.stringify(result));
        return result;
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
}