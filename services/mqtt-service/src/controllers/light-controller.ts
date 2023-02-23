import { injectable, inject } from 'inversify';

import { IIncomingTasmotaTopic, IsTasmotaLightState, IsTasmotaPowerState, ITasmotaLightState } from '../models'
import { MqttDecorator } from '@smarthome/decorators'
import { TYPES } from '../injection';
import { ILightService } from '../services';
import { container } from '../injection/inversify.config';

export interface ILightController {
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void;
    HandleStatusState(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void;
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void;
    HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void;
    HandleLWT(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void;
}

@injectable()
export class LightController implements ILightController {
    constructor() { }

    @MqttDecorator.MqttRoute("stat/light/{id}/result", "light")
    public async HandleStatusResult(
        message: Buffer, 
        deviceId: string, 
        correlationId: string, 
        lightService: ILightService
    ): Promise<void> {
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
            await lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId })
        } catch (error){
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("stat/light/{id}/state", "light")
    public HandleStatusState(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("HandleLightStatusStateNotImplemented");
            const messageJson = JSON.parse(message.toString());
            lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId });
            console.log(messageJson);
        } catch (error){
            console.log(error);
        }
    }

    // @MqttDecorator.MqttRoute("tele/light/{id}/result", "light")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("HandleLightTelemetryResultNotImplemented");
            const messageJson = JSON.parse(message.toString());
            lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId });
            console.log("WTF");
            console.log(messageJson);
        } catch (error){
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/state", "light")
    public HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void {
        try {
            const messageJson = JSON.parse(message.toString());
            lightService.updateLight({...messageJson, DeviceType: "light", DeviceId: deviceId })
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/lwt", "light")
    public HandleLWT(message: Buffer, deviceId: string, correlationId: string, lightService: ILightService): void {
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