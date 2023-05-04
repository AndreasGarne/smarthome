import express, { Express } from 'express';
import { IServerConfiguration } from './models';
import { getSwitches } from './controllers/switch-controller';

export const createServer = (config: IServerConfiguration): Express => {
    const server = express();

    server.get("/", getSwitches)
    server.use('/meh', (req, res, next) => {
        console.log("BLAH");
        res.send();
    })

    
    return server;
}