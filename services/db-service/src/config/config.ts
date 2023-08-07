export interface configuration {
    ApiPort: number;
    MongoURL: string;
    MongoAuthSource: string;
    MongoUser: string;
    MongoPassword: string;
    LogLevel: string;
}

export const createConfig = (): configuration => {
    return {
        ApiPort: Number(validate("API_PORT")),
        MongoURL: validate("MONGO_URL"),
        MongoAuthSource: validate("MONGO_AUTH_SOURCE"),
        MongoUser: validate("MONGO_USER"),
        MongoPassword: validate("MONGO_PASSWORD"),
        LogLevel: validate("LOG_LEVEL"),
    }
}

const validate = (envToCheck: string): string => {
    const configItem = process.env[envToCheck];
    if (typeof configItem === 'undefined') 
        throw new Error(`Environment variable ${envToCheck} is not defined`);

    return configItem;
}
