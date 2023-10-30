import { injectable, inject } from 'inversify';
import * as mqtt from "mqtt";

import { MqttDecorator } from '@smarthome/decorators'
import { TYPES } from '../injection';
import { IDeviceService, IRemoteService } from '../services';
import { ILogger } from '../utilities/logger';
import { z } from 'zod';
import { remoteControlPayloadSchema } from '../models';
import { RemoteControl } from '../models/remote-control.models';


export interface IRemoteController {
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetrySensor(message: Buffer, deviceId: string, correlationId: string, mqttClient: mqtt.MqttClient): void;
    HandleLWT(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class RemoteController implements IRemoteController {
    constructor(
        @inject(TYPES.IRemoteService) private readonly remoteService: IRemoteService,
        @inject(TYPES.IDeviceService) private readonly deviceService: IDeviceService,
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) { }

    @MqttDecorator.MqttRoute("stat/remote/{id}/result", "remote")
    public async HandleStatusResult(
        message: Buffer, 
        deviceId: string, 
        correlationId: string     
    ): Promise<void> {
        try {
            const messageJson = JSON.parse(message.toString());
            // if (IsTasmotaLightState(messageJson)) {
            //     this.logger.log("debug", "light state");
            // }
            // if (IsTasmotaPowerState(messageJson)) {
            //     this.logger.log("debug", "power state");
            // }
            // this.logger.log("debug", "messageJsonHandleStatusResult", messageJson);
            // this.logger.log("debug", "ligthserviceobject", lightService);
            // this.logger.log("debug", deviceId);
            // this.logger.log("debug", correlationId);
        } catch (error){
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("stat/remote/{id}/state", "remote")
    public HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // this.logger.log("debug", message);
            // this.logger.log("debug", deviceId);
            // this.logger.log("debug", correlationId);
            this.logger.log("debug", "I am here");
            const messageJson = JSON.parse(message.toString());
            this.logger.log("debug", `messageJson: ${JSON.stringify(messageJson)}`);
        } catch (error){
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/remote/{id}/result", "remote")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // this.logger.log("debug", message);
            // this.logger.log("debug", deviceId);
            // this.logger.log("debug", correlationId);
            this.logger.log("debug", "HandleLightTelemetryResultNotImplemented");
            const messageJson = JSON.parse(message.toString());
            this.logger.log("debug", messageJson);
        } catch (error){
            this.logger.log("error", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/remote/{id}/state", "remote")
    public HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const messageJson = JSON.parse(message.toString());
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/remote/{id}/sensor", "remote")
    public async HandleTelemetrySensor(message: Buffer, id: string, correlationId: string, mqttClient: mqtt.MqttClient): Promise<void> {
        try {
            const messageJson = JSON.parse(message.toString());
            const device: RemoteControl | null = await this.remoteService.getById(id);
            if (!device) {
                this.logger.log("error", `Could not find device with id ${id}`);
                return;
            }
            console.log(device);
            console.log(device.Name);
            console.log(JSON.stringify(device.Actions));
            // const availableActions = Object.keys(device.Actions);
            // console.log(availableActions);
            console.log(remoteControlPayloadSchema.safeParse(messageJson));
            console.log();
            mqttClient.publish(`cmnd/zbbridge/ZbSend`, JSON.stringify({"Device":"0x8220","Send":{"Power":"toggle"}}));
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/remote/{id}/lwt", "remote")
    public HandleLWT(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            this.logger.log("info", "HandleLightLWTNotImplemented");
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    // public RouteLightMessages(topicData: IIncomingTasmotaTopic, message: Buffer, deviceId: string): void {
    //     try {
    //         const messageString = message.toString();
    //         this.logger.log("debug", messageString);
    //     }
    //     catch {
    //         this.logger.log("error", "error routing message in light controller");
    //     }
    // }
}