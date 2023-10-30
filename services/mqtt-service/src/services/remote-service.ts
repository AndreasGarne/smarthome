import { inject, injectable } from "inversify";
import { TYPES } from "../injection";
import { IRemoteRepository } from "../repositories";
import { RemoteControl } from "../models/remote-control.models";

export interface IRemoteService {
    getById(id: string): Promise<RemoteControl | null>;
}

@injectable()
export class RemoteService implements IRemoteService {
    constructor(@inject(TYPES.IRemoteRepository) private readonly remoteRepo: IRemoteRepository) { }

    public async getById(id: string): Promise<RemoteControl | null> {
        return await this.remoteRepo.getById(id);
    }
}