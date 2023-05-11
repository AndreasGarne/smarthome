import { injectable, inject } from 'inversify';

import { TYPES } from '../injection';
import { MqttDecorator } from '@smarthome/decorators';
import { IZigbeeSensorData, IZigbeeSensorPayload } from '../models';
import { IThermoHygroService } from './termo-hygro-service';

export interface ITermoHygroController {
    HandleStatusResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void;
    HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void;
    HandleLWT(message: Buffer, deviceId: string, correlationId: string): void;
}

@injectable()
export class TermoHygroController implements ITermoHygroController {
    constructor(
        @inject(TYPES.IThermoHygroService) private readonly thermoHygroService: IThermoHygroService
    ) { }

    @MqttDecorator.MqttRoute("tele/termohygro/{id}/sensor", "termoHygro")
    public async HandleTelemetrySensor(
        message: Buffer,
        deviceId: string,
        correlationId: string
    ): Promise<void> {
        try {
            const messageJson: IZigbeeSensorPayload = JSON.parse(message.toString());
            const data = messageJson.ZbReceived[Object.keys(messageJson.ZbReceived)[0]]
            console.log("HandleTelemetrySensor messageJson", messageJson);
            console.log("HandleTelemetrySensor messageJson", data);
            if (data.Humidity) {
                this.thermoHygroService.saveHygrometerMeasurement({
                    Timestamp: Date.now(),
                    Humidity: data.Humidity,
                    DeviceId: deviceId,
                    DeviceName: "testTemp",
                    Placement: 'Office'
                });
                console.log("I am hygrometer data");
            }
            if (data.Temperature) {
                this.thermoHygroService.saveTemperatureMeasurement({
                    Timestamp: Date.now(),
                    Temperature: data.Temperature,
                    DeviceId: deviceId,
                    DeviceName: "testTemp",
                    Placement: 'Office'
                });
                console.log("I am thermometer data");
            }
            // console.log("messageJsonHandleStatusResult", messageJson);
            // console.log("ligthserviceobject", lightService);
            // console.log(deviceId);
            // console.log(correlationId);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("stat/telehygro/{id}/result", "teleHygro")
    public async HandleStatusResult(
        message: Buffer,
        deviceId: string,
        correlationId: string): Promise<void> {
        try {
            const messageJson = JSON.parse(message.toString());
            console.log("HandleStatusResult messageJson", messageJson);
            // console.log("messageJsonHandleStatusResult", messageJson);
            // console.log("ligthserviceobject", lightService);
            // console.log(deviceId);
            // console.log(correlationId);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("stat/telehygro/{id}/state", "teleHygro")
    public HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // console.log(message);
            // console.log(deviceId);
            // console.log(correlationId);
            const messageJson = JSON.parse(message.toString());
            console.log("HandleStatusState messageJson", messageJson);
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/telehygro/{id}/result", "teleHygro")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            console.log("HandleTermohygroLWTNotImplemented");
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("tele/telehygro/{id}/state", "teleHygro")
    public HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            console.log("HandleTermohygroLWTNotImplemented");
        } catch (error) {
            console.log(error);
        }
    }

    @MqttDecorator.MqttRoute("telet/telehygro/{id}/lwt", "teleHygro")
    public HandleLWT(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            console.log("HandleTermohygroLWTNotImplemented");
        } catch (error) {
            console.log(error);
        }
    }
}