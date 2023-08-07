import { AutomationEvent } from "../models";
import { AutomationRepository } from "../repositories/automation-repository";

export interface AutomationService {
    handleCreateEvent: (event: any) => void;
    handleStateChangeEvent: (event: any) => void;
}

export const createAutomationService = (repo: AutomationRepository): AutomationService => {
    const handleCreateEvent = (event: AutomationEvent) => {
        
    };
    const handleStateChangeEvent = (event: any) => {

    };

    return {
        handleCreateEvent,
        handleStateChangeEvent,
    }
};
