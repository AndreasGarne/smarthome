import { injectable, inject } from 'inversify';

import { IIncomingTasmotaTopic, IsTasmotaLightState, IsTasmotaPowerState, ITasmotaLightState } from '../models'
import { MqttDecorator } from '../decorators'

export interface ILightController {
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleLWT(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class LightController implements ILightController {

    @MqttDecorator.MqttRoute("stat/light/{id}/result")
    public HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            const messageJson = JSON.parse(message.toString());
            if (IsTasmotaLightState(messageJson)) {
                console.log("light state");
            }
            if (IsTasmotaPowerState(messageJson)) {
                console.log("power state");
            }
            console.log(messageJson);
            // console.log(deviceId);
            // console.log(correlationId);
        } catch {

        }
    }

    @MqttDecorator.MqttRoute("stat/light/{id}/state")
    public HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("HandleLightStatusStateNotImplemented");
            const messageJson = JSON.parse(message.toString());
            console.log(messageJson);
        } catch {

        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/result")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("HandleLightTelemetryResultNotImplemented");
            const messageJson = JSON.parse(message.toString());
            console.log(messageJson);
        } catch {

        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/state")
    public HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("HandleLightTelemetryStateNotImplemented");
            const messageJson = JSON.parse(message.toString());
            console.log(messageJson);
        } catch {

        }
    }

    @MqttDecorator.MqttRoute("tele/light/{id}/lwt")
    public HandleLWT(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            console.log("HandleLightLWTNotImplemented");

        } catch {

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