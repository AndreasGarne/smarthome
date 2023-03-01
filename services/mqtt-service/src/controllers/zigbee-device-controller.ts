import { injectable } from 'inversify';

import { MqttDecorator } from '@smarthome/decorators'
import { flattenZigbeePayload, mapZigbeeDeviceProperties } from '../utilities/helpers';
import { container } from '../injection/inversify.config';
import { ILightService } from '../services';
import { TYPES } from '../injection';
import { ILightController } from './light-controller';
import { IZigbeePayload } from '../models';
import { IDeviceRepository } from '../repositories';
import { IBaseController } from './base-controller';

export interface IZigbeeDeviceController {
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleSensor(message: Buffer, deviceId: string, correlationId: string): Promise<void>;
    HandleState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class ZigbeeDeviceController implements IZigbeeDeviceController {

    // @MqttDecorator.MqttRoute("tele/zbbridge/{id}/result", "zbDevice")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("stat/zbbridge/{id}/result", "zbDevice")
    public HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/{id}/sensor", "zbDevice")
    public async HandleSensor(message: Buffer, deviceId: string, correlationId: string): Promise<void> {
        try {
            await this.RouteMessage(message, correlationId);
            // container.get<ILightController>(TYPES.ILightController).HandleStatusResult(Buffer.from(JSON.stringify(cleanedInfo)), deviceId, correlationId, container.get<ILightService>(TYPES.ILightService));
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/{id}/state", "zbDevice")
    public HandleState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/{id}/info1", "zbDevice")
    public HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/{id}/info2", "zbDevice")
    public HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/{id}/info3", "zbDevice")
    public HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    private async RouteMessage(message: Buffer, correlationId: string) {
        const jsonPayload: IZigbeePayload = JSON.parse(message.toString());
        const flattenedPayload = flattenZigbeePayload(jsonPayload);
        console.log("flattenedZigbeePayload", flattenedPayload);
        const cleanedInfo = mapZigbeeDeviceProperties(flattenedPayload);
        console.log("cleanedInfo", cleanedInfo);

        const deviceRepo = container.get<IDeviceRepository>(TYPES.IDeviceRepository);
        const device = await deviceRepo.getByDeviceId(cleanedInfo.DeviceId);

        let controller: any;
        switch (device?.DeviceType) {
            case "light":
                controller = container.get<ILightController>(TYPES.ILightController);
                break;
            default:
                console.log(`ZB Devicetype not ${device === null ? "found" : "supported"}: ${device?.DeviceType}, DeviceID: ${cleanedInfo.DeviceId}`);
                return;
        }

        const payloadType = Object.keys(jsonPayload)[0];

        switch (payloadType) {
            case "ZbReceived":
                console.log("This should be a result");
                controller["HandleStatusResult"](Buffer.from(JSON.stringify(cleanedInfo)), cleanedInfo.DeviceId, correlationId);
                break;
            case "ZbInfo":
                console.log("This should be a status or info thing");
                controller["HandleStatusState"](
                    Buffer.from(JSON.stringify(cleanedInfo)), 
                    cleanedInfo.DeviceId, 
                    correlationId
                );
                break;
        }
    }
}