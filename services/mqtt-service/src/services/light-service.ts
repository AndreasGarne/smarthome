import { inject, injectable } from "inversify";
import { TYPES } from "../injection";
import { ILightRepository } from "../repositories";
import { ILight } from "@smarthome/models";

export interface ILightService {
    updateLight(lightDataToUpdate: ILight): Promise<ILight>;
}

@injectable()
export class LightService implements ILightService {
    constructor(@inject(TYPES.ILightRepository) private readonly lightRepo: ILightRepository) { }

    public async updateLight(lightDataToUpdate: ILight): Promise<ILight> {
        return await this.lightRepo.update(lightDataToUpdate)
    }
}