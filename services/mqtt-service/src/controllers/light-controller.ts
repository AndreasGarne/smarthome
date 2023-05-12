import { injectable, inject } from 'inversify';

import { IsTasmotaLightState, IsTasmotaPowerState } from '../models'
import { MqttDecorator } from '@smarthome/decorators'
import { TYPES } from '../injection';
import { ILightService } from '../services';
import { ILogger } from '../utilities/logger';

export interface ILightController {
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleLWT(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class LightController implements ILightController {
    constructor(
        @inject(TYPES.ILightService) private readonly lightService: ILightService,
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) { }

    @MqttDecorator.MqttRoute("stat/light/{id}/result", "light")
    public async HandleStatusResult(
        message: Buffer, 
        deviceId: string, 
        correlationId: string     ): Promise<void> {
        try {
            const messageJson = JSON.parse(message.toString());
            if (IsTasmotaLightState(messageJson)) {
                this.logger.log("debug", "light state");
            }
            if (IsTasmotaPowerState(messageJson)) {
                this.logger.log("debug", "power state");
            }
            // this.logger.log("debug", "messageJsonHandleStatusResult", messageJson);
            // this.logger.log("debug", "ligthserviceobject", lightService);
            // this.logger.log("debug", deviceId);
            // this.logger.log("debug", correlationId);
            await this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId })
        } catch (error){
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("stat/light/{id}/state", "light")
    public HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // this.logger.log("debug", message);
            // this.logger.log("debug", deviceId);
            // this.logger.log("debug", correlationId);
            this.logger.log("debug", "I am here");
            const messageJson = JSON.parse(message.toString());
            this.logger.log("debug", `messageJson: ${JSON.stringify(messageJson)}`);
            this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId });
        } catch (error){
            this.logger.log("error", error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/light/{id}/result", "light")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // this.logger.log("debug", message);
            // this.logger.log("debug", deviceId);
            // this.logger.log("debug", correlationId);
            this.logger.log("debug", "HandleLightTelemetryResultNotImplemented");
            const messageJson = JSON.parse(message.toString());
            this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId });
            this.logger.log("debug", messageJson);
        } catch (error){
            this.logger.log("error", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/state", "light")
    public HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const messageJson = JSON.parse(message.toString());
            this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId })
        } catch (error) {
            this.logger.log("error", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/lwt", "light")
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