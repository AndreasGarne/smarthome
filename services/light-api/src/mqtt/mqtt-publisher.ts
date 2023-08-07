import { inject, injectable } from 'inversify';
import * as mqtt from 'mqtt';
import { TYPES } from '../dependency-injection';
import { IMqttConfiguration } from '../models';
import { ILogger } from '../logger';

export interface IMqttClient {
    publish(topic: string, message: string): Promise<void>;
}

@injectable()
export class MqttClient implements IMqttClient {
    private mqttPublisherClient: mqtt.MqttClient;
    constructor(
        @inject(TYPES.IConfiguration) private readonly config: IMqttConfiguration,
        @inject(TYPES.ILogger) private readonly logger: ILogger
        ) {
        this.mqttPublisherClient = mqtt.connect(this.config.MqttHost, {
            username: this.config.MqttUser,
            password: this.config.MqttPassword
        });

        this.RegisterConnectHandler();
    }

    public async publish(topic: string, message: string): Promise<void> {
        this.logger.logInfo(`Published ${message} to ${topic}`);
        this.mqttPublisherClient.publish(topic, message);
    }

    private RegisterConnectHandler(): void {
        this.mqttPublisherClient.on('connect', () => {
            console.log("connected to mqtt");
        });
    }
}