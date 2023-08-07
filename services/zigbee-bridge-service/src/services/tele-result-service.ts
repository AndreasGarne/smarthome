import { SmarthomeLogger } from "@smarthome/logger";
import { ZigbeeBridgeRepository } from "../repositories";

export interface TeleResultService {
    handleMessage(message: any): void;
}

export const createTeleResultService = (zbBridgeRepo: ZigbeeBridgeRepository, logger: SmarthomeLogger): TeleResultService => {
    const handleMessage = (message: any) => {
        logger.log('info', `Message handled by TELE/RESULT service.`);// Message: ${JSON.stringify(message, null, 0)}`);
    };

    return {
        handleMessage,
    }
};