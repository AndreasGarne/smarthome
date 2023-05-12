import { inject, injectable } from "inversify";
import { ILight } from "../models";
import Light from '../models/light-model';
import { TYPES } from "../injection";
import { ILogger } from "../utilities/logger";

export interface ILightRepository {
    update(lightToUpdate: ILight): Promise<ILight>;
}

@injectable()
export class LightRepository implements ILightRepository {
    private light;
    constructor(
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) {
        this.light = Light;
    }

    public async update(lightToUpdate: ILight): Promise<ILight> {
        const lightFromDb = await this.light.findOneAndUpdate<ILight>({ DeviceId: lightToUpdate.DeviceId.toLowerCase() }, lightToUpdate, { new: true });
        // this.logger.log("debug", "lightFromDb", lightFromDb);
        // const updatedInfo = { ...lightFromDb, ...lightToUpdate };
        // this.logger.log("debug", "updatedLight", updatedInfo);
        return lightFromDb;
    }
}
