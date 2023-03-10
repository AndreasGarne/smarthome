import { injectable } from "inversify";
import { ILight } from "@smarthome/models";
import Light from '@smarthome/models/light-model';

export interface ILightRepository {
    update(lightToUpdate: ILight): Promise<ILight>;
}

@injectable()
export class LightRepository implements ILightRepository {
    private light;
    constructor() {
        console.log("repository getting called");
        this.light = Light;
    }

    public async update(lightToUpdate: ILight): Promise<ILight> {
        const lightFromDb = await this.light.findOneAndUpdate<ILight>({ DeviceId: lightToUpdate.DeviceId.toLowerCase() }, lightToUpdate, { new: true });
        // console.log("lightFromDb", lightFromDb);
        // const updatedInfo = { ...lightFromDb, ...lightToUpdate };
        // console.log("updatedLight", updatedInfo);
        return lightFromDb;
    }
}
