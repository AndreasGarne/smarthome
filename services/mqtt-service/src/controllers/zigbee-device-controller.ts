import { injectable, inject } from 'inversify';

import { MqttDecorator } from '@smarthome/decorators'
import { flattenZigbeePayload } from '../utilities/helpers';

export interface IZigbeeDeviceController {
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleSensor(message: Buffer, deviceId: string, correlationId: string): void;
    HandleState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class ZigbeeDeviceController implements IZigbeeDeviceController {

    // @MqttDecorator.MqttRoute("tele/zbbridge/{id}/result", "zbDevice")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        console.log("WE ARE GETTING CALLS TO ZBD HandleTelemetryResult");
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

    // @MqttDecorator.MqttRoute("tele/zbbridge/{id}/sensor", "zbDevice")
    public HandleSensor(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
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
}