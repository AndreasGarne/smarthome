import { connect } from 'mongoose';
import { Server } from './server/server';
import dotenv from 'dotenv';
dotenv.config();

connect("mongodb://192.168.1.197:27015/smarthome", {
    authSource: "smarthome",
    user: "smarthome-user",
    pass: "emohtrams",
}).then(() => {
    const server = new Server();
    server.start();
}).catch((error) => { console.log(error); });

