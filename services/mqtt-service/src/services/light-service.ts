import { inject, injectable } from "inversify";
import { TYPES } from "../injection";
import { ILightRepository } from "../repositories";
import { ILight } from "@smarthome/models";
import { IBaseService } from "./base-service";

export interface ILightService extends IBaseService {
    updateLight(lightDataToUpdate: ILight): Promise<ILight>;
}

@injectable()
export class LightService implements ILightService {
    constructor(@inject(TYPES.ILightRepository) private readonly lightRepo: ILightRepository) {
        console.log("service getting called");
    }

    public async updateLight(lightDataToUpdate: ILight): Promise<ILight> {
        return await this.lightRepo.update(lightDataToUpdate)
    }
}