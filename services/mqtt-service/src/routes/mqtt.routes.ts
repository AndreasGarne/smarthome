import * as mqtt from "mqtt";
import crypto from "crypto";
import { injectable, inject } from "inversify";

import { IRoutingInfo, IResolvedRoute, IMQTTConfiguration } from "../models";
import {
  ITasmotaController,
  TasmotaController,
  ILightController,
  LightController,
  IRemoteController,
  RemoteController,
  IZigbeeBridgeController,
  ZigbeeBridgeController,
} from "../controllers";
import { MqttDecorator } from "@smarthome/decorators";
import { TYPES } from "../injection";
import { container } from "../injection/inversify.config";
import { IDeviceService, ILightService } from "../services";
import {
  ITermoHygroController,
  TermoHygroController,
} from "../termo-hygro/termo-hygro-controller";
import { ILogger } from "../utilities/logger";

export interface IMqttRouter {}

@injectable()
export class MqttRouter implements IMqttRouter {
  private mqttClient: mqtt.MqttClient;
  private tasmotaController: ITasmotaController;
  private routingInfo: IRoutingInfo[];

  constructor(
    @inject(TYPES.IConfiguration) private readonly config: IMQTTConfiguration,
    @inject(TYPES.IDeviceService) private readonly deviceService: IDeviceService,
    @inject(TYPES.ILogger) private readonly logger: ILogger
  ) {
    this.mqttClient = mqtt.connect(this.config.MqttHost, {
      username: this.config.MqttUser,
      password: this.config.MqttPassword,
    });

    this.tasmotaController = new TasmotaController();
    this.routingInfo = this.SetupRoutingData();
    // this.logger.log("debug", this.routingInfo);

    this.RegisterConnectHandler();
    this.RegisterMessageHandler();
  }

  private RegisterConnectHandler(): void {
    this.mqttClient.on("connect", () => {
      this.logger.log("info", "connected to mqtt");
      this.mqttClient.subscribe("tele/+/+/+", (err) => {
        if (err) {
          this.logger.log(
            "error",
            `Failed to subscribe to smartbase. Error: ${err}`
          );
        }
      });
      this.mqttClient.subscribe("stat/+/+/+", (err) => {
        if (err) {
          this.logger.log(
            "error",
            `Failed to subscribe to smartbase. Error: ${err}`
          );
        }
      });
      this.mqttClient.subscribe("tasmota/#", (err) => {
        if (err) {
          this.logger.log(
            "error",
            `Failed to subscribe to smartbase. Error: ${err}`
          );
        }
      });
      this.mqttClient.subscribe("+/zbbridge/+", (err) => {
        if (err) {
          this.logger.log(
            "error",
            `Failed to subscribe to zbbridge. Error: ${err}`
          );
        }
      });
    });
  }

  private RegisterMessageHandler(): void {
    this.mqttClient.on("message", this.MessageHandler);
  }

  private MessageHandler = async (topic: string, message: Buffer) => {
    topic = topic.toLowerCase();
    this.logger.log("debug", `Incoming topic: ${topic}`);
    if (topic.indexOf("/") == -1) {
      this.logger.log("error", `No / in topic: ${topic}`);
      return;
    }

    const guid = crypto.randomUUID();

    const topicParts = topic.split("/");
    if (topicParts.length === 4 && topicParts[1] === "zbbridge") {
      const device = await this.deviceService.getByDeviceId(topicParts[2]);
      this.logger.log("debug", `Device : ${device}`);
      if (!device) throw new Error("Device not found");
      this.logger.log("debug", `Device type: ${device.DeviceType}`);
      this.logger.log("debug", `Topic parts: ${topicParts}`);
      topicParts[1] = device.DeviceType.toLowerCase();
      topicParts[2] = device.id;
      topic = topicParts.join("/");
    }

    let nbrFound = 0;
    let foundRoute: IResolvedRoute | null = null;
    for (let routeInfo of this.routingInfo) {
      let tempFoundRoute = this.FindRouteMatch(routeInfo, topic);
      if (tempFoundRoute) {
        foundRoute = tempFoundRoute;
        nbrFound++;
      }
    }
    if (nbrFound > 1) {
      this.logger.log(
        "info",
        `More than one route matches topic this is bad. Topic: ${topic}`
      );
      return;
    }
    if (!foundRoute) {
      this.logger.log("info", `No matching route for topic: ${topic}`);
      return;
    }

    this.logger.log("debug", `Device type: ${JSON.stringify(foundRoute)}`);

    const foundRouteInfo =
      foundRoute && MqttDecorator.allMqttRoutes.get(foundRoute.route);
    if (!foundRouteInfo) {
      this.logger.log("info", "no routes found");
    }
    const { functionToCall, controllerName, functionName } =
      foundRoute && MqttDecorator.allMqttRoutes.get(foundRoute.route)!;

    if (controllerName === "zbDevice") {
      const [prefix, deviceId, suffix] = foundRoute.callProperties;
      // this.MessageHandler(`${prefix}/zbbridge/${deviceId}/${suffix}`, message);
      return;
    }

    const controller = this.GetController(controllerName);
    controller &&
      controller[functionName](message, ...foundRoute.callProperties, guid, this.mqttClient);
  };

  private FindRouteMatch(
    routeInfo: IRoutingInfo,
    topic: string
  ): IResolvedRoute | null {
    var match = topic.match(routeInfo.regex);
    // this.logger.log("debug", `Testing topic: ${topic}, with regex: ${routeInfo.regex}`);
    // this.logger.log("debug", match);

    if (match === null) {
      return null;
    }

    if (routeInfo.artifacts.length === 0) {
      return {
        callProperties: [],
        route: routeInfo.route,
      };
    }

    if (!match.groups) {
      this.logger.log("info", "no groups");
      return null;
    }

    if (routeInfo.artifacts.length != Object.keys(match!.groups!).length) {
      this.logger.log(
        "info",
        "mismatch in expected artifacts and result groups."
      );

      return null;
    }

    // const callProperties: string[] = [];
    // for (let artifact of routeInfo.artifacts) {
    //     callProperties.push(match.groups[artifact]);
    // }

    const callProperties = routeInfo.artifacts.map(
      (artifact) => match!.groups![artifact]
    );

    return {
      route: routeInfo.route,
      callProperties: callProperties,
    };
  }

  private GetController(controllerName: string): any {
    switch (controllerName) {
      case "light":
        return container.get<ILightController>(TYPES.ILightController);
      case "zbBridge":
        return container.get<IZigbeeBridgeController>(
          TYPES.IZigbeeBridgeController
        );
      case "termoHygro":
        return container.get<ITermoHygroController>(
          TYPES.ITermoHygroController
        );
      case "remote":
        return container.get<IRemoteController>(
          TYPES.IRemoteController
        );
    }
    throw new Error("");
  }

  private SetupRoutingData(): IRoutingInfo[] {
    const routingData: IRoutingInfo[] = [];
    const allRoutes = MqttDecorator.allMqttRoutes.keys();
    for (let route of allRoutes) {
      this.logger.log("debug", route);
      routingData.push({
        regex: this.GetRegexForRoute(route),
        route: route,
        artifacts: this.GetRouteArtifacts(route),
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
      artifacts.push(match[1]);
    }

    return artifacts;
  }
}
