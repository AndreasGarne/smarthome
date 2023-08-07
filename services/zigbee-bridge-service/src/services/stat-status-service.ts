import { SmarthomeLogger } from "@smarthome/logger";
import { ZigbeeBridgeRepository } from "../repositories";
import { BridgeStateMessage, isBridgeState, isBridgeStatus, isBridgeStatusFWR, isBridgeStatusLOG, isBridgeStatusMEM, isBridgeStatusMQT, isBridgeStatusNET, isBridgeStatusPRM, isBridgeStatusSNS, isBridgeStatusSTS, isBridgeStatusTIM } from "./models";

export interface StatStatusService {
    handleMessage(message: any): void;
}

export const createStatStatusService = (zbBridgeRepo: ZigbeeBridgeRepository, logger: SmarthomeLogger): StatStatusService => {
    const handleMessage = (message: any) => {
        logger.log('info', `Message starting to being handled by STAT/STATUS service.`);// Message: ${JSON.stringify(message, null, 0)}`);
        if (isBridgeStatus(message)) {
            logger.log('info', 'Message is basic bridge status info - not implemented');
            return;
        }
        if (isBridgeStatusFWR(message)) {
            logger.log('info', 'Message is firmware related - not implemented');
            return;
        }
        if (isBridgeStatusLOG(message)) {
            logger.log('info', 'Message is log related - not implemented');
            return;
        }
        if (isBridgeStatusMEM(message)) {
            logger.log('info', 'Message is memory related - not implemented');
            return;
        }
        if (isBridgeStatusMQT(message)) {
            logger.log('info', 'Message is mqtt related - not implemented');
            return;
        }
        if (isBridgeStatusNET(message)) {
            logger.log('info', 'Message is network related - not implemented');
            return;
        }
        if (isBridgeStatusPRM(message)) {
            logger.log('info', 'Message is program related - not implemented');
            return;
        }
        if (isBridgeStatusTIM(message)) {
            logger.log('info', 'Message is time related - not implemented');
            return;
        }
        if (isBridgeStatusSNS(message)) {
            logger.log('info', 'Message is sns related - not implemented');
            return;
        }
        if (isBridgeStatusSTS(message)) {
            logger.log('info', 'Message is sts related - not implemented');
            return;
        }

        // logger.log('error', `unrecognized message in STAT/STATUS handler. message: ${JSON.stringify(message, null, 0)}`);
    };

    const handleBridgeState = (bridgeState: BridgeStateMessage) => {
        logger.log('info', 'message is bridge state');
    }
    return {
        handleMessage,
    }
};