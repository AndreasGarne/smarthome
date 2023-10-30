import { SmarthomeLogger } from "@smarthome/logger";
import { ZigbeeBridgeRepository } from "../repositories";
import { BridgeStateMessage, isBridgeState } from "./models";

export interface StatResultService {
    handleMessage(message: any): void;
}

export const createStatResultService = (zbBridgeRepo: ZigbeeBridgeRepository, logger: SmarthomeLogger): StatResultService => {
    const handleMessage = (message: any) => {
        logger.log('info', `Message starting to being handled by STAT/RESULT service.`);// Message: ${JSON.stringify(message, null, 0)}`);
        if (isBridgeState(message)) {
            handleBridgeState(message);
            return;
        }

        logger.log('error', `unrecognized message in STAT/RESULT handler. message: ${JSON.stringify(message, null, 0)}`);
    };

    const handleBridgeState = (bridgeState: BridgeStateMessage) => {
        // logger.log('info', 'message is bridge state');
    }
    return {
        handleMessage,
    }
};
