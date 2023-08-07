import * as mqtt from "mqtt";
import { configuration } from "./config";
import { ZigbeeBridgeController, createZigbeeBridgeController } from "./controllers";
import { createZigbeeBridgeRepository } from "./repositories";
import { SmarthomeLogger } from "@smarthome/logger";
import { createStatResultService, createTeleLwtService, createTeleResultService, createTeleStateService } from "./services";
import { createStatStatusService } from "./services/stat-status-service";

export interface mqttApp {
    start(): void;
    publish(topic: string, message: string): void;
};

export const createMqttApp = (config: configuration, logger: SmarthomeLogger): mqttApp => {
    const mqttSubscriberClient = mqtt.connect(config.MqttHost, {
        username: config.MqttUser,
        password: config.MqttPassword
    });
    const zbBridgeRepo = createZigbeeBridgeRepository(config);
    const teleStateService = createTeleStateService(zbBridgeRepo, logger);
    const teleResultService = createTeleResultService(zbBridgeRepo, logger);
    const statResultService = createStatResultService(zbBridgeRepo, logger);
    const statStatusService = createStatStatusService(zbBridgeRepo, logger);
    const teleLwtService = createTeleLwtService(zbBridgeRepo, logger);
    const zbBridgeController = createZigbeeBridgeController(
        teleStateService,
        teleResultService,
        statResultService,
        statStatusService,
        teleLwtService,
        logger,
    );
    
    const publish = (topic: string, message: string) => {
        mqttSubscriberClient.publish(topic, message);
    };

    const start = () => {
        RegisterConnectHandler(mqttSubscriberClient);
        RegisterMessageHandler(mqttSubscriberClient, zbBridgeController);
    };

    return {
        start,
        publish,
    };
}


const RegisterMessageHandler = (mqttSubscriberClient: mqtt.MqttClient, zbBridgeController: ZigbeeBridgeController): void => {
    mqttSubscriberClient.on('message', zbBridgeController.messageHandler);
}

const RegisterConnectHandler = (mqttSubscriberClient: mqtt.MqttClient): void => {
    mqttSubscriberClient.on('connect', () => {
        // this.logger.log("info", "connected to mqtt");
        mqttSubscriberClient.subscribe('+/zbbridge/+', (err) => {
            if (err) {
                console.log("error", `Failed to subscribe to zbbridge. Error: ${err}`)
            }
        });
    });
}
