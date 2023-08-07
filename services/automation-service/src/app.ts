import * as mqtt from "mqtt";
import { configuration } from "./config";
import { SmarthomeLogger } from "@smarthome/logger";
import { AutomationController, createAutomationController } from "./controllers/automation-controller";
import { createAutomationRepository } from "./repositories/automation-repository";
import { createAutomationService } from "./services/automation-service";

export interface mqttApp {
    start(): void;
    publish(topic: string, message: string): void;
};

export const createMqttApp = (config: configuration, logger: SmarthomeLogger): mqttApp => {
    const mqttSubscriberClient = mqtt.connect(config.MqttHost, {
        username: config.MqttUser,
        password: config.MqttPassword
    });
    
    const start = () => {
        const automationRepository = createAutomationRepository(config);
        const automationService = createAutomationService(automationRepository);
        const automationController = createAutomationController(automationService, logger);
        RegisterConnectHandler(mqttSubscriberClient);
        RegisterMessageHandler(mqttSubscriberClient, automationController);
    };

    const publish = (topic: string, message: string) => {
        mqttSubscriberClient.publish(topic, message);
    };

    return {
        start,
        publish,
    };
}


const RegisterMessageHandler = (mqttSubscriberClient: mqtt.MqttClient, automationController: AutomationController): void => {
    mqttSubscriberClient.on('message', automationController.handleAutomationEvent);
}

const RegisterConnectHandler = (mqttSubscriberClient: mqtt.MqttClient): void => {
    mqttSubscriberClient.on('connect', () => {
        // this.logger.log("info", "connected to mqtt");
        mqttSubscriberClient.subscribe('internal/automation', (err) => {
            if (err) {
                console.log("error", `Failed to subscribe to automation topic. Error: ${err}`)
            }
        });
    });
}
