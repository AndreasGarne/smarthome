import mqtt from 'mqtt';
import crypto from 'crypto';
import { injectable, inject } from 'inversify';

import { IRoutingInfo, IResolvedRoute, IMQTTConfiguration } from '../models';
import {
    ITasmotaController,
    TasmotaController,
    ILightController,
    LightController,
    IZigbeeBridgeController,
    ZigbeeBridgeController,
} from '../controllers';
import { MqttDecorator } from '@smarthome/decorators';
import { TYPES } from '../injection';
import { container } from '../injection/inversify.config';
import { IDeviceService, ILightService } from '../services';
import { ITermoHygroController, TermoHygroController } from '../termo-hygro/termo-hygro-controller';

export interface IMqttRouter { }

@injectable()
export class MqttRouter implements IMqttRouter {
    private mqttSubscriberClient: mqtt.MqttClient;
    private tasmotaController: ITasmotaController;
    private routingInfo: IRoutingInfo[];

    constructor(
        @inject(TYPES.IConfiguration) private readonly config: IMQTTConfiguration,
        @inject(TYPES.IDeviceService) private readonly deviceService: IDeviceService,
    ) {
        this.mqttSubscriberClient = mqtt.connect(this.config.MqttHost, {
            username: this.config.MqttUser,
            password: this.config.MqttPassword
        });

        this.tasmotaController = new TasmotaController();
        this.routingInfo = this.SetupRoutingData();
        // console.log(this.routingInfo);

        this.RegisterConnectHandler();
        this.RegisterMessageHandler();
    }

    private RegisterConnectHandler(): void {
        this.mqttSubscriberClient.on('connect', () => {
            console.log("connected to mqtt");
            this.mqttSubscriberClient.subscribe('tele/+/+/+', function (err) {
                if (err) {
                    console.log(`Failed to subscribe to smartbase. Error: ${err}`)
                }
            });
            this.mqttSubscriberClient.subscribe('stat/+/+/+', function (err) {
                if (err) {
                    console.log(`Failed to subscribe to smartbase. Error: ${err}`)
                }
            });
            this.mqttSubscriberClient.subscribe('tasmota/#', function (err) {
                if (err) {
                    console.log(`Failed to subscribe to smartbase. Error: ${err}`)
                }
            });
            this.mqttSubscriberClient.subscribe('+/zbbridge/+', function (err) {
                if (err) {
                    console.log(`Failed to subscribe to zbbridge. Error: ${err}`)
                }
            });
        });
    }

    private RegisterMessageHandler(): void {
        this.mqttSubscriberClient.on('message', this.MessageHandler);
    }

    private MessageHandler = async (topic: string, message: Buffer) => {
        // topic = topic.toLowerCase();
        console.log("Incoming topic", topic);
        if (topic.indexOf('/') == -1) {
            console.log("No / in topic", topic);
            return;
        }

        const guid = crypto.randomUUID();

        const topicParts = topic.split('/');
        if (topicParts.length === 4 && topicParts[1] === 'zbbridge') {
            const deviceType = await this.deviceService.getDeviceType(topicParts[2]);
            topic = topic.replace('zbbridge', deviceType);
        }

        let nbrFound = 0;
        let foundRoute: IResolvedRoute | null = null;
        for (let routeInfo of this.routingInfo) {
            let tempFoundRoute = this.FindRouteMatch(routeInfo, topic.toLowerCase());
            if (tempFoundRoute) {
                foundRoute = tempFoundRoute;
                nbrFound++;
            }
        }
        if (nbrFound > 1) {
            console.log(`More than one route matches topic this is bad. Topic: ${topic}`);
            return;
        }
        if (!foundRoute) {
            console.log(`No matching route for topic: ${topic}`);
            return;
        }

        const foundRouteInfo = foundRoute && MqttDecorator.allMqttRoutes.get(foundRoute.route);
        if (!foundRouteInfo) {
            console.log();
        }
        const { functionToCall, controllerName, functionName } = foundRoute && MqttDecorator.allMqttRoutes.get(foundRoute.route)!;

        if (controllerName === "zbDevice") {
            const [prefix, deviceId, suffix] = foundRoute.callProperties;
            // this.MessageHandler(`${prefix}/zbbridge/${deviceId}/${suffix}`, message);
            return;
        }

        const controller = this.GetController(controllerName);
        controller && controller[functionName](message, ...foundRoute.callProperties, guid);
    }

    private FindRouteMatch(routeInfo: IRoutingInfo, topic: string): IResolvedRoute | null {
        var match = topic.match(routeInfo.regex);
        // console.log(`Testing topic: ${topic}, with regex: ${routeInfo.regex}`);
        // console.log(match);

        if (match === null) {
            return null;
        }


        if (routeInfo.artifacts.length === 0) {
            return {
                callProperties: [],
                route: routeInfo.route
            };
        }

        if (!match.groups) {
            console.log("no groups");
            return null;
        }

        if (routeInfo.artifacts.length != Object.keys(match!.groups!).length) {
            console.log("mismatch in expected artifacts and result groups.");

            return null;
        }

        // const callProperties: string[] = [];
        // for (let artifact of routeInfo.artifacts) {
        //     callProperties.push(match.groups[artifact]);
        // }

        const callProperties = routeInfo.artifacts.map(artifact => match!.groups![artifact]);

        return {
            route: routeInfo.route,
            callProperties: callProperties
        };
    }

    private GetController(controllerName: string): any {
        switch (controllerName) {
            case "light":
                return container.get<ILightController>(TYPES.ILightController);
            case "zbBridge":
                return container.get<IZigbeeBridgeController>(TYPES.IZigbeeBridgeController);
            case "termoHygro":
                return container.get<ITermoHygroController>(TYPES.ITermoHygroController);
        }
        throw new Error("");
    }

    private SetupRoutingData(): IRoutingInfo[] {
        const routingData: IRoutingInfo[] = [];
        const allRoutes = MqttDecorator.allMqttRoutes.keys();
        for (let route of allRoutes) {
            console.log(route);
            routingData.push({
                regex: this.GetRegexForRoute(route),
                route: route,
                artifacts: this.GetRouteArtifacts(route)
            });
        }

        return routingData;
    }

    private GetRegexForRoute(route: string): RegExp {
        route = route.replaceAll("{", "(?<");
        route = route.replaceAll("}", ">.*)");
        route = route.replaceAll("/", "\\/");

        return new RegExp(route);
    }

    private GetRouteArtifacts(route: string): string[] {
        const artifacts: string[] = [];
        const matches = route.matchAll(/{(\w+)}/g);
        for (let match of matches) {
            artifacts.push(match[1])
        }

        return artifacts;
    }

}
