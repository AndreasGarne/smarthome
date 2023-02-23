import { inject, injectable } from "inversify";
import { TYPES } from "../dependency-injection";
import { ILightRepository } from "../repositories";
import { ILight } from '@smarthome/models';
import { ICommand, ILightCommand } from "../models";
import { IMqttClient } from "../mqtt/mqtt-publisher";
import { ILogger } from "../logger";
import { CommandNotFoundError } from "../errors/command-not-found-error";

export interface ILightService {
    add(light: ILight): Promise<void>;
    getAll(): Promise<ILight[]>;
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

    public async getAll(): Promise<ILight[]> {
        return await this.lightRepository.getAll();
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
        const command = light.Commands?.find(command => command.CommandType === submittedCommand.Name);
        console.log(command);

        if (command === undefined) {
            this.logger.logError(`light with mac: ${light.DeviceId} doesn't have command: ${submittedCommand.Name}`);
            throw new CommandNotFoundError(`light with mac: ${light.DeviceId} doesn't have command: ${submittedCommand.Name}`);
        }
        const validatedCommand = this.validateCommand(submittedCommand, command);

        await this.mqttClient.publish(`${validatedCommand.TopicPrefix}/${light.Topic}/${validatedCommand.TopicSuffix}`, validatedCommand.Payload);
    }

    private validateCommand(submittedCommand: ILightCommand, templateCommand: ICommand): ICommand {
        if (templateCommand.Type == "NoArgs")
            return templateCommand;

        if (!submittedCommand.Payload)
            throw new Error("Payload required");

        if (templateCommand.Type === "ValidatedSingleArg" && !this.validatePayloadByRegex(new RegExp(templateCommand.Validation), submittedCommand.Payload))
            throw new Error("Payload invalid");

        templateCommand.Payload = submittedCommand.Payload;


        console.log(templateCommand);
        return templateCommand;
    }

    validatePayloadByRegex(regex: RegExp, payload: string): boolean {
        return regex.test(payload);
    }

    public async removeById(id: string): Promise<void> {
        this.lightRepository.removeById(id);
    }
}