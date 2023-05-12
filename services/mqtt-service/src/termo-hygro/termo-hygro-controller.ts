import { injectable, inject } from 'inversify';

import { TYPES } from '../injection';
import { MqttDecorator } from '@smarthome/decorators';
import { IZigbeeSensorData, IZigbeeSensorPayload } from '../models';
import { IThermoHygroService } from './termo-hygro-service';
import { ILogger } from '../utilities/logger';

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
        @inject(TYPES.IThermoHygroService) private readonly thermoHygroService: IThermoHygroService,
        @inject(TYPES.ILogger) private readonly logger: ILogger,
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

            if (data.Humidity) {
                this.thermoHygroService.saveHygrometerMeasurement({
                    Timestamp: Date.now(),
                    Humidity: data.Humidity,
                    DeviceId: deviceId,
                    DeviceName: "testTemp",
                    Placement: 'Office'
                });
            }
            if (data.Temperature) {
                this.thermoHygroService.saveTemperatureMeasurement({
                    Timestamp: Date.now(),
                    Temperature: data.Temperature,
                    DeviceId: deviceId,
                    DeviceName: "testTemp",
                    Placement: 'Office'
                });
            }
        } catch (error) {
            this.logger.log("info", error);
        }
    }

    @MqttDecorator.MqttRoute("stat/telehygro/{id}/result", "teleHygro")
    public async HandleStatusResult(
        message: Buffer,
        deviceId: string,
        correlationId: string): Promise<void> {
        try {
            const messageJson = JSON.parse(message.toString());
            this.logger.log("info", `HandleStatusResult messageJson: ${JSON.stringify(messageJson)}`);
            // this.logger.log("info", "messageJsonHandleStatusResult", messageJson);
            // this.logger.log("info", "ligthserviceobject", lightService);
            // this.logger.log("info", deviceId);
            // this.logger.log("info", correlationId);
        } catch (error) {
            this.logger.log("info", error);
        }
    }

    @MqttDecorator.MqttRoute("stat/telehygro/{id}/state", "teleHygro")
    public HandleStatusState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            // this.logger.log("info", message);
            // this.logger.log("info", deviceId);
            // this.logger.log("info", correlationId);
            const messageJson = JSON.parse(message.toString());
            this.logger.log("info", `HandleStatusState messageJson: ${JSON.stringify(messageJson)}`);
        } catch (error) {
            this.logger.log("info", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/telehygro/{id}/result", "teleHygro")
    public HandleTelemetryResult(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            this.logger.log("info", "HandleTermohygroLWTNotImplemented");
        } catch (error) {
            this.logger.log("info", error);
        }
    }

    @MqttDecorator.MqttRoute("tele/telehygro/{id}/state", "teleHygro")
    public HandleTelemetryState(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            this.logger.log("info", "HandleTermohygroLWTNotImplemented");
        } catch (error) {
            this.logger.log("info", error);
        }
    }

    @MqttDecorator.MqttRoute("telet/telehygro/{id}/lwt", "teleHygro")
    public HandleLWT(message: Buffer, deviceId: string, correlationId: string): void {
        try {
            this.logger.log("info", "HandleTermohygroLWTNotImplemented");
        } catch (error) {
            this.logger.log("info", error);
        }
    }
}