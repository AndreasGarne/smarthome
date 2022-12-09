import mqtt from 'mqtt';
import crypto from 'crypto';

import { IConfiguration } from '../configuration';
import { IIncomingTasmotaTopic, IRoutingInfo } from '../models';
import {
    ITasmotaController,
    TasmotaController,
    ILightController,
    LightController,
} from './';
import { MqttDecorator } from '../decorators';
import { IResolvedRoute } from '../models/resolved-route.models';

export interface IMqttController { }

export class MqttController implements IMqttController {
    private mqttSubscriberClient: mqtt.MqttClient;
    private tasmotaController: ITasmotaController;
    private lightController: ILightController;
    private routingInfo: IRoutingInfo[];

    constructor(private config: IConfiguration) {
        this.mqttSubscriberClient = mqtt.connect(config.MqttHost, {
            username: config.MqttUser,
            password: config.MqttPassword
        });

        this.tasmotaController = new TasmotaController();
        this.lightController = new LightController();
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

            const routeToCall = foundRoute && MqttDecorator.allMqttRoutes.get(foundRoute.route);
            foundRoute && routeToCall && routeToCall(message, ...foundRoute.callProperties, guid);
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

    private SetupRoutingData(): IRoutingInfo[] {
        const routingData: IRoutingInfo[] = [];
        const allRoutes = MqttDecorator.allMqttRoutes.keys();
        for (let route of allRoutes) {
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
