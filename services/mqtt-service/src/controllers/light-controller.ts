import { injectable, inject } from 'inversify';

import { IsTasmotaLightState, IsTasmotaPowerState } from '../models'
import { MqttDecorator } from '@smarthome/decorators'
import { TYPES } from '../injection';
import { ILightService } from '../services';

export interface ILightController {
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleLWT(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class LightController implements ILightController {
    constructor(@inject(TYPES.ILightService) private readonly lightService: ILightService) { }

    @MqttDecorator.MqttRoute("stat/light/{id}/result", "light")
    public async HandleStatusResult(
        message: Buffer, 
        deviceId: string, 
        correlationId: string     ): Promise<void> {
        try {
            const messageJson = JSON.parse(message.toString());
            if (IsTasmotaLightState(messageJson)) {
                console.log("light state");
            }
            if (IsTasmotaPowerState(messageJson)) {
                console.log("power state");
            }
            // console.log("messageJsonHandleStatusResult", messageJson);
            // console.log("ligthserviceobject", lightService);
            // console.log(deviceId);
            // console.log(correlationId);
            await this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId })
        } catch (error){
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("stat/light/{id}/state", "light")
    public HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("I am here");
            const messageJson = JSON.parse(message.toString());
            console.log("messageJson", messageJson);
            this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId });
        } catch (error){
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/light/{id}/result", "light")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("HandleLightTelemetryResultNotImplemented");
            const messageJson = JSON.parse(message.toString());
            this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId });
            console.log(messageJson);
        } catch (error){
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/state", "light")
    public HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const messageJson = JSON.parse(message.toString());
            this.lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId })
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/lwt", "light")
    public HandleLWT(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            console.log("HandleLightLWTNotImplemented");
        } catch (error) {
            console.log(error);
        }
    }

    // public RouteLightMessages(topicData: IIncomingTasmotaTopic, message: Buffer, deviceId: string): void {
    //     try {
    //         const messageString = message.toString();
    //         console.log(messageString);
    //     }
    //     catch {
    //         console.log("error routing message in light controller");
    //     }
    // }
}