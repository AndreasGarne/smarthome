import { SmarthomeLogger } from "@smarthome/logger";
import { ZigbeeBridgeRepository } from "../repositories";
import { isBridgeState } from "./models";

export interface TeleStateService {
    handleMessage(message: any): void;
}

export const createTeleStateService = (zbBridgeRepo: ZigbeeBridgeRepository, logger: SmarthomeLogger): TeleStateService => {
    const handleMessage = (message: any) => {
        // if (isBridgeState(message))
        //     logger.log('debug', 'Yes this is bridge state');
        logger.log('info', `Message handled by TELE/STATE service.`);// Message: ${JSON.stringify(message, null, 0)}`);
    };

    return {
        handleMessage,
    }
};