import { injectable, inject } from 'inversify';

import { MqttDecorator } from '../decorators'
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

    @MqttDecorator.MqttRoute("tele/zbbridge/{id}/result")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("stat/zbbridge/{id}/result")
    public HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/{id}/sensor")
    public HandleSensor(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/{id}/state")
    public HandleState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/{id}/info1")
    public HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/{id}/info2")
    public HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/{id}/info3")
    public HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }
}