import { SmarthomeLogger } from "@smarthome/logger";
import { DeviceService } from "../services/device-service";
import { NextFunction, Request, Response } from "express";

export interface DeviceController { 
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    get(req: Request, res: Response, next: NextFunction): Promise<void>;
    add(req: Request, res: Response, next: NextFunction): Promise<void>;   
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    remove(req: Request, res: Response, next: NextFunction): Promise<void>;
};

export const createDeviceController = (logger: SmarthomeLogger, deviceService: DeviceService): DeviceController => {
    const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const result = await deviceService.getDevices();
        res.status(200).json(result);
    };
    const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
    };
    const add = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const addedDevice = await deviceService.addDevice(req.body);
        res.status(201).json(addedDevice);
    };
    const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
    };
    const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
    };

    return {
        getAll,
        get,
        add,
        update,
        remove,
    };
};