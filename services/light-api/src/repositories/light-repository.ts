import { inject, injectable } from "inversify";
import { ILight } from "../models";
import Command from '../models/command-model';
import Light from '../models/light-model';
import { TYPES } from "../dependency-injection";
import { ILogger } from "../logger";

export interface ILightRepository {
    getAll(): Promise<ILight[]>;
    getById(id: string): Promise<ILight>;
    add(light: ILight): Promise<void>;
    removeById(id: string): Promise<void>;
}

@injectable()
export class LightRepository implements ILightRepository {
    private light;
    private command;
    constructor(
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) { 
        this.light = Light;
        this.command  = Command;
    }

    public async getById(id: string): Promise<ILight> {
        const light = await this.light.findById<ILight>(id).populate("Commands");
        if (!light)
            throw new Error("could not find light");
        return light;
    }

    public async getAll(): Promise<ILight[]> {
        return await this.light.find<ILight>().populate("Commands");
    }

    public async add(lightToSave: ILight): Promise<void> {
        const light = new this.light(lightToSave);
        await light.save();
    }

    public async removeById(id: string): Promise<void> {
        console.log(id);
        this.light.findByIdAndRemove(id)
        .then(() => {
            console.log("Succesfully deleted");
        })
        .catch((error: Error) => {
            console.log(error);
        });
    }
}