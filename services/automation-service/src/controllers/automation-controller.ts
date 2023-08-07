import { SmarthomeLogger } from "@smarthome/logger";
import { AutomationService } from "../services/automation-service";

export interface AutomationController {
    handleAutomationEvent: (topic: string, message: Buffer) => void;
};

export const createAutomationController = (automationService: AutomationService, logger: SmarthomeLogger) => {
    const handleAutomationEvent = (topic: string, message: Buffer) => {
        logger.log("info", `Received automation event: ${JSON.stringify(message.toString())}`);
    };

    return {
        handleAutomationEvent,
    };
};