import { injectable, inject } from 'inversify';

import { MqttDecorator } from '@smarthome/decorators'
import { flattenZigbeePayload } from '../utilities/helpers';
import { ILogger } from '../utilities/logger';
import { TYPES } from '../injection';

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
    constructor(
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) {};
    @MqttDecorator.MqttRoute("tele/zbbridge/result", "zbBridge")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            this.logger.log("info", "ZigbeeBridgeController: HandleTelemetryResult");
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("stat/zbbridge/result", "zbBridge")
    public HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            this.logger.log("debug", "ZigbeeBridgeController: HandleStatusResult");
            // this.logger.log("debug", "flattenedZigbeePayloadInZBHandleStatusResult", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/sensor")
    public HandleSensor(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            this.logger.log("info", "ZigbeeBridgeController: HandleSensor");
            // this.logger.log("debug", "flattenedZigbeePayload", flattenZigbeePayload(jsonPayload));
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/state", "zbBridge")
    public HandleState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            this.logger.log("info", "ZigbeeBridgeController: HandleState");
            // this.logger.log("debug", "unflattened zigbee payload in ZB HandleState", jsonPayload);
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/info1")
    public HandleInfo1(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            this.logger.log("info", "ZigbeeBridgeController: HandleInfo1");
            // this.logger.log("debug", "unflattened zigbee payload", jsonPayload);
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/info2")
    public HandleInfo2(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            this.logger.log("info", "ZigbeeBridgeController: HandleInfo2");
            // this.logger.log("debug", "unflattened zigbee payload", jsonPayload);
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/zbbridge/info3")
    public HandleInfo3(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const jsonPayload = JSON.parse(message.toString());
            this.logger.log("info", "ZigbeeBridgeController: HandleInfo3");
            // this.logger.log("debug", "unflattened zigbee payload", jsonPayload);
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/zbbridge/lwt", "zbBridge")
    public HandleLwt(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            this.logger.log("info", `ZbBridge LWT state: ${message.toString()}`);
        } catch (error) {
            this.logger.log("error", error);
        }
    }
}