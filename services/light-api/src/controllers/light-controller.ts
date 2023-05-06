import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Patch,
    Query,
    Route,
    SuccessResponse,
    Delete,
} from "tsoa";
import { inject } from "inversify";
import { provideSingleton, TYPES } from "../dependency-injection";
import { ILight } from '../models';
import { ILightCommand, ILightResponse } from "../models";
import { ILightService } from "../services";

@provideSingleton(LightController)
@Route("lights")
export class LightController extends Controller {
    constructor(@inject(TYPES.ILightService) private readonly lightService: ILightService) {
        super();
    }

    @Get()
    public async getAll(
    ): Promise<ILightResponse[]> {
        return await this.lightService.getAll();
    }

    @Post()
    public async add(
        @Body() light: ILight
    ): Promise<void> {
        return await this.lightService.add(light);
    }

    @Patch('{lightIds}')
    public async call(
        @Path() lightIds: string,
        @Body() command: ILightCommand
    ): Promise<void> {
        return await this.lightService.sendCommand(lightIds.split(","), command);
    }

    @Delete('{id}')
    public async remove(
        @Path() id: string,
    ): Promise<void> {
        return await this.lightService.removeById(id);
    }
}