import express, { NextFunction, Request, Response } from 'express';
import path from "path";
import * as OpenApiValidator from 'express-openapi-validator';
import { SmarthomeLogger } from "../../../shared/logger/src";

import { configuration } from "./config";
import * as bodyParser from 'body-parser';
import { createRouter } from './routes/routes';
import { createDeviceController } from './controllers/device-controller';
import { createDeviceRepository } from './repositories/device-repository';
import { createDeviceService } from './services/device-service';
import { MqttPublisher } from './mqtt-app';

export const createApp = (config: configuration, logger: SmarthomeLogger, mqttPublisher: MqttPublisher) => {
    const app = express();

    const apiPath = path.join(__dirname, 'openapi.yaml');
    logger.log("info", apiPath);
    app.use(bodyParser.json());
    app.use(
        OpenApiValidator.middleware({
            apiSpec: apiPath,
            validateRequests: true, // (default)
            validateResponses: false, // false by default
        }),
    );
    const deviceRepo = createDeviceRepository(logger, config);
    const deviceService = createDeviceService(logger, deviceRepo, mqttPublisher);
    const deviceController = createDeviceController(logger, deviceService);
    const router = createRouter(config, logger, deviceController);
    app.use('/v1/devices', router);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        // format error
        res.status(err.status || 500).json({
            message: err.message,
            // errors: err.errors,
        });
    });
    const start = () => {
        app.listen(config.ApiPort, () => {
            logger.log("info", `DB server started on port ${config.ApiPort}`);
        });
    }

    return {
        start,
    }
}
