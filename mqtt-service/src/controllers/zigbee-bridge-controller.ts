import { injectable, inject } from 'inversify';

import { MqttDecorator } from '../decorators'
import { flattenZigbeePayload } from '../utilities/helpers';

export interface IZigbeeBridgeController {
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleLwt(message: Buffer, deviceId: string, correlationId: string): void;
    HandleSensor(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void;
    HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class ZigbeeBridgeController implements IZigbeeBridgeController {

    @MqttDecorator.MqttRoute("tele/zbbridge/result")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("stat/zbbridge/result")
    public HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/sensor")
    public HandleSensor(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/state")
    public HandleState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/info1")
    public HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/info2")
    public HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/info3")
    public HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/lwt")
    public HandleLwt(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            console.log(message.toString());
        } catch (error) {
            console.log(error);
        }
    }
}