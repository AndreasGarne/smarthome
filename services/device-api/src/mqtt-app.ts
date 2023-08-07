import * as mqtt from 'mqtt';
import { configuration } from "./config";
import { SmarthomeLogger } from "@smarthome/logger";

export interface MqttPublisher {
    publish(topic: string, message: string): Promise<void>;
};

export const createMqttPublisher = async (config: configuration, logger: SmarthomeLogger): Promise<MqttPublisher> => {
    const mqttClient = await mqtt.connectAsync(config.MqttHost, {
        username: config.MqttUser,
        password: config.MqttPassword,
    });
    const publish = async (topic: string, message: string): Promise<void> => {
        await mqttClient.publishAsync(topic, message);
    };

    return {
        publish,
    };
};