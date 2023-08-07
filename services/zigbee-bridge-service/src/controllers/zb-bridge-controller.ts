import { SmarthomeLogger } from "@smarthome/logger";
import { configuration } from "../config";
import { ZigbeeBridgeRepository } from "../repositories";
import { StatResultService, TeleLwtService, TeleResultService, TeleStateService } from "../services";
import { StatStatusService } from "../services/stat-status-service";

export interface ZigbeeBridgeController {
    messageHandler: (topic: string, message: Buffer) => Promise<void>;
}
export const createZigbeeBridgeController = (
    teleStateService: TeleStateService,
    teleResultService: TeleResultService,
    statResultService: StatResultService,
    statStatusService: StatStatusService,
    teleLwtService: TeleLwtService,
    logger: SmarthomeLogger,
): ZigbeeBridgeController => ({
    messageHandler: async (topic: string, message: Buffer) => {
        // const guid = crypto.randomUUID();

        const topicParts = topic.split('/');
        const prefix = topicParts[0].toLowerCase();
        const suffix = topicParts[2].toLowerCase();
        let parsedMessage: {[key:string] : any } | string;
        try {
            switch (`${prefix}-${suffix}`) {
                case 'tele-state': 
                    teleStateService.handleMessage(JSON.parse(message.toString()));
                    break;
                case 'tele-result': 
                    teleResultService.handleMessage(JSON.parse(message.toString()));
                break;
                case 'stat-result': 
                    statResultService.handleMessage(JSON.parse(message.toString()));
                break;
                case 'stat-status': 
                case 'stat-status1': 
                case 'stat-status2': 
                case 'stat-status3': 
                case 'stat-status4': 
                case 'stat-status5': 
                case 'stat-status6': 
                case 'stat-status7': 
                case 'stat-status10': 
                case 'stat-status11': 
                    statStatusService.handleMessage(JSON.parse(message.toString()));
                break;
                case 'tele-lwt': 
                    teleLwtService.handleMessage(message.toString());
                break;
                default:
                    logger.log('error', `topic not found: ${topic}`);
            }
        } catch {
            logger.log('error', `Something went wrong trying to route topic. Topic: ${topic}`);//, message: ${message.toString()}`);
            return;
        }
    }
});