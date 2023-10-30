import express, { NextFunction, Request, Response } from 'express';
import path from "path";
import * as OpenApiValidator from 'express-openapi-validator';
import { SmarthomeLogger } from "../../../shared/logger/src";

import { configuration } from "./config";
import { createStorageController } from "./controllers";
import * as bodyParser from 'body-parser';
import { createRouter } from './routes/routes';
import { lightModel } from './schemas/light';
import { deviceModel } from './schemas/device';
import { remoteModel } from './schemas/remote';

export const createApp = (config: configuration, logger: SmarthomeLogger) => {
    const app = express();
    const storageController = createStorageController(config, logger);

    const apiPath = path.join(__dirname, 'openapi.yaml');
    // logger.log("info", apiPath);
    app.use(bodyParser.json());
    app.use(
        OpenApiValidator.middleware({
            apiSpec: apiPath,
            validateRequests: true, // (default)
            validateResponses: false, // false by default
        }),
    );
    const router = createRouter(config, logger, storageController);
    app.use('/v1/lights', router.addRoutes(lightModel));
    app.use('/v1/remotes', router.addRoutes(remoteModel));
    app.use('/v1/devices', router.addRoutes(deviceModel));

    // app.get('/v1/zb-bridges/:zbBridgeId', zbBridgeController.getZigbeeBridges);
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
