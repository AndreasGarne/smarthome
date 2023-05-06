import { inject, injectable } from "inversify";
import { TYPES } from "../dependency-injection";
import { ILightRepository } from "../repositories";
import { ILight, ICommand } from '../models';
import { ILightCommand, ILightResponse } from "../models";
import { IMqttClient } from "../mqtt/mqtt-publisher";
import { ILogger } from "../logger";
import { CommandNotFoundError } from "../errors/command-not-found-error";
import { rgbToXY } from "../utils/color-helper";
import { MapLightToLightResponse } from '../mappers/light-response-mapper';

export interface ILightService {
    add(light: ILight): Promise<void>;
    getAll(): Promise<ILightResponse[]>;
    sendCommand(ids: string[], command: ILightCommand): Promise<void>;
    removeById(id: string): Promise<void>;
}

@injectable()
export class LightService implements ILightService {
    constructor(
        @inject(TYPES.ILightRepository) private readonly lightRepository: ILightRepository,
        @inject(TYPES.IMqttClient) private readonly mqttClient: IMqttClient,
        @inject(TYPES.ILogger) private readonly logger: ILogger
    ) { }

    public async getAll(): Promise<ILightResponse[]> {
        const lights = await this.lightRepository.getAll();
        return MapLightToLightResponse(lights);
    }

    public async add(light: ILight): Promise<void> {
        return await this.lightRepository.add(light);
    }

    public async sendCommand(lightIds: string[], command: ILightCommand): Promise<void> {
        //validatecommand
        //run command
        for (const lightId of lightIds) {
            await this.makeCall(lightId, command);
        }
    }

    private async makeCall(lightId: string, submittedCommand: ILightCommand): Promise<void> {
        const light = await this.lightRepository.getById(lightId);
        const command: ICommand = light.Commands?.find(command => command.CommandType === submittedCommand.Name);

        if (command === undefined) {
            this.logger.logError(`light with mac: ${light.DeviceId} doesn't have command: ${submittedCommand.Name}`);
            throw new CommandNotFoundError(`light with mac: ${light.DeviceId} doesn't have command: ${submittedCommand.Name}`);
        }
        command.Payload = this.validateCommand(submittedCommand, command, light.DeviceId);

        if (command.IsZigbee) {
            command.Payload = this.setZigbeePayload(command, light);
        }

        await this.mqttClient.publish(`${command.TopicPrefix}/${light.Topic}/${command.TopicSuffix}`, command.Payload);
    }

    private validateCommand(submittedCommand: ILightCommand, templateCommand: ICommand, deviceId: string): string {
        if (templateCommand.Type == "NoArgs")
            return templateCommand.Payload;

        if (!submittedCommand.Payload)
            throw new Error("Payload required");

        if (templateCommand.Type === "ValidatedSingleArg" && !this.validatePayloadByRegex(new RegExp(templateCommand.Validation), submittedCommand.Payload))
            throw new Error("Payload invalid");

        return submittedCommand.Payload;
    }

    private validatePayloadByRegex(regex: RegExp, payload: string): boolean {
        return regex.test(payload);
    }

    private setZigbeePayload(zigbeeCommand: ICommand, light: ILight): string {
        if (zigbeeCommand.IsXYColour) {
            const xyColour = rgbToXY(zigbeeCommand.Payload);
            zigbeeCommand.Payload = xyColour;
        }

        return `{\"Device\":\"${light.DeviceId}\",\"Send\":{\"${zigbeeCommand.ZigbeeCommand}\":\"${zigbeeCommand.Payload}\"}}`;
    }

    public async removeById(id: string): Promise<void> {
        this.lightRepository.removeById(id);
    }
}