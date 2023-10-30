import { inject, injectable } from "inversify";
import { TYPES } from "../injection";
import { ILogger } from "../utilities/logger";
import { RemoteControl } from "../models/remote-control.models";
import { fetch } from "undici";

export interface IRemoteRepository {
    getById(id: string): Promise<RemoteControl | null>;
}

@injectable()
export class RemoteRepository implements IRemoteRepository {
    // private remote;
    constructor(
        @inject(TYPES.ILogger) private readonly logger: ILogger,
    ) { }

    public async getById(id: string): Promise<RemoteControl | null> {
        this.logger.log("debug", `Looking for remote: ${id}`);
        const response = await fetch(`http://localhost:3579/v1/remotes/${id}`)
        if (response.status !== 200) {
            throw new Error(`Error fetching remote: ${response.statusText}`);
        }
        const remote = await response.json() as RemoteControl;
        this.logger.log("debug", `Found remote: ${remote?.DeviceId}`);
        return remote;
    }
}
