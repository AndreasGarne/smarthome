import { injectable, inject } from 'inversify';

import { MqttDecorator } from '@smarthome/decorators'
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

    @MqttDecorator.MqttRoute("tele/zbbridge/result", "zbBridge")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("ZigbeeBridgeController: HandleTelemetryResult");
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("stat/zbbridge/result", "zbBridge")
    public HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("ZigbeeBridgeController: HandleStatusResult");
            // console.log("flattenedZigbeePayloadInZBHandleStatusResult", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/sensor")
    public HandleSensor(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("ZigbeeBridgeController: HandleSensor");
            // console.log("flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/state", "zbBridge")
    public HandleState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("ZigbeeBridgeController: HandleState");
            // console.log("unflattened zigbee payload in ZB HandleState", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/info1")
    public HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("ZigbeeBridgeController: HandleInfo1");
            // console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/info2")
    public HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("ZigbeeBridgeController: HandleInfo2");
            // console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/info3")
    public HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            console.log("ZigbeeBridgeController: HandleInfo3");
            // console.log("unflattened zigbee payload", jsonPayload);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/lwt", "zbBridge")
    public HandleLwt(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            console.log(message.toString());
        } catch (error) {
            console.log(error);
        }
    }
}