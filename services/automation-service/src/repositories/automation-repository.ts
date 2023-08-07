import { configuration } from "../config";

export interface AutomationRepository {
    getAll(): void;
    getById(id: string): void;
    getByQuery(query: any): void;
}

export const createAutomationRepository = (config: configuration): AutomationRepository => {
    const getAll = () => {
    };
    const getById = (id: string) => {
    };
    const getByQuery = (query: any) => {  
    };

    return {
        getAll,
        getById,
        getByQuery,
    }
}