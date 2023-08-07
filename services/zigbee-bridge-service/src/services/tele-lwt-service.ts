import { SmarthomeLogger } from "@smarthome/logger";
import { ZigbeeBridgeRepository } from "../repositories";

export interface TeleLwtService {
    handleMessage(message: string): void;
}

export const createTeleLwtService = (zbBridgeRepo: ZigbeeBridgeRepository, logger: SmarthomeLogger): TeleLwtService => {
    const handleMessage = (message: string): void => {
        logger.log('info', `Message handled by LWT service. Message: ${message}`);
    };

    return {
        handleMessage,
    }
};