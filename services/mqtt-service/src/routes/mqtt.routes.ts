import mqtt from 'mqtt';
import crypto from 'crypto';
import { injectable, inject } from 'inversify';

import { IConfiguration } from '../configuration';
import { IRoutingInfo, IResolvedRoute } from '../models';
import {
    ITasmotaController,
    TasmotaController,
    ILightController,
    LightController,
    IZigbeeBridgeController,
    ZigbeeBridgeController,
    IZigbeeDeviceController,
    ZigbeeDeviceController
} from '../controllers';
import { MqttDecorator } from '@smarthome/decorators';
import { TYPES } from '../injection';
import { container } from '../injection/inversify.config';
import { IBaseService } from '../services/base-service';
import { ILightService } from '../services';

export interface IMqttRouter { }

@injectable()
export class MqttRouter implements IMqttRouter {
    private mqttSubscriberClient: mqtt.MqttClient;
    private tasmotaController: ITasmotaController;
    private routingInfo: IRoutingInfo[];

    constructor(@inject(TYPES.IConfiguration) private readonly config: IConfiguration) {
        this.mqttSubscriberClient = mqtt.connect(config.MqttHost, {
            username: config.MqttUser,
            password: config.MqttPassword
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
        this.mqttSubscriberClient.on('message', (topic, message) => {
            if (topic.indexOf('/') == -1) {
                console.log("No / in topic", topic);
                return;
            }

            const guid = crypto.randomUUID();

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

            const routeToCall = foundRoute && MqttDecorator.allMqttRoutes.get(foundRoute.route)?.func;
            const serviceName = foundRoute && MqttDecorator.allMqttRoutes.get(foundRoute.route)?.neededService;
            const service = serviceName && this.GetService(serviceName);
            foundRoute && service && routeToCall && routeToCall(message, ...foundRoute.callProperties, guid, service);
        });
    }

    private FindRouteMatch(routeInfo: IRoutingInfo, topic: string): IResolvedRoute | null {
        var match = topic.match(routeInfo.regex);
        // console.log(`Testing topic: ${topic}, with regex: ${routeInfo.regex}`);
        // console.log(match);

        if (match === null) {
            return null;
        }


        if (routeInfo.artifacts.length === 0) {
            console.log("route without artifacts. weird");
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

        const callProperties: string[] = [];
        for (let artifact of routeInfo.artifacts) {
            callProperties.push(match.groups[artifact]);
        }

        return {
            route: routeInfo.route,
            callProperties: callProperties
        };
    }

    private GetService(serviceName: string): IBaseService {
        switch (serviceName) {
            case "light":
                return container.get<ILightService>(TYPES.ILightService)
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