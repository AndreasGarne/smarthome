import express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import morgan, { StreamOptions } from 'morgan';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from "../../tsoa-build/routes";
import '../controllers/light-controller';
import { IServerConfiguration } from "../models";
import { TYPES } from '../dependency-injection';
import { iocContainer } from '../dependency-injection/ioc';
import { ILogger } from "../logger";
import { CommandNotFoundError } from "../errors/command-not-found-error";


export class Server {
    private readonly app: Express;
    private readonly config: IServerConfiguration;
    private readonly logger: ILogger;

    constructor() {
        this.app = express();
        this.config = iocContainer.get<IServerConfiguration>(TYPES.IConfiguration);
        this.logger = iocContainer.get<ILogger>(TYPES.ILogger);

        this.app.set("port", this.config.ApiPort);

        this.configureMiddleware();
        this.configureMorgan();

        RegisterRoutes(this.app);

        // this.setupSwagger();

        this.configureErrorHandling();
    }

    private configureMiddleware(): void {
        // Use body parser to read sent json payloads
        // otherwise nothing is recieved in body
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        const options = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
        this.app.use(cors(options));
    }

    private configureMorgan() {
        const stream: StreamOptions = {
            write: (message) => this.logger.logInfo(message),
        };

        this.app.use(
            morgan(
                ":method :url :status :res[content-length] - :response-time ms",
                { stream }
            )
        );
    }

    private configureErrorHandling() {
        this.app.use(function errorHandler(
            err: unknown,
            req: Request,
            res: Response,
            next: NextFunction
        ): Response | void {
            if (err instanceof ValidateError) {
                return res.status(422).json({
                    message: "Validation Failed",
                    details: err?.fields,
                });
            }
            if (err instanceof CommandNotFoundError) {
                return res.status(404).json({
                    message: (err as CommandNotFoundError).message
                });
            }
            if (err instanceof Error) {
                console.log(err);
                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }

            next();
        });
    }

    // private setupSwagger() {
    //     this.app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));
    // }

    public start() {
        this.app.listen(this.app.get("port"), () => {
            this.logger.logInfo("🚀 Server is running on port " + this.app.get("port"));
        });
    }
}