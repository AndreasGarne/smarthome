export interface configuration {
    MqttHost: string;
    MqttPort: string;
    MqttUser: string;
    MqttPassword: string;
    MongoURL: string;
    MongoAuthSource: string;
    MongoUser: string;
    MongoPassword: string;
    LogLevel: string;
    StorageApiUrl: string;
}

export const createConfig = (): configuration => {
    return {
        MqttHost: validate("MQTT_HOST"),
        MqttPort: validate("MQTT_PORT"),
        MqttUser: validate("MQTT_USER"),
        MqttPassword: validate("MQTT_PASSWORD"),
        MongoURL: validate("MONGO_URL"),
        MongoAuthSource: validate("MONGO_AUTH_SOURCE"),
        MongoUser: validate("MONGO_USER"),
        MongoPassword: validate("MONGO_PASSWORD"),
        LogLevel: validate("LOG_LEVEL"),
        StorageApiUrl: validate("STORAGE_API_URL"),
    }
}

const validate = (envToCheck: string): string => {
    const configItem = process.env[envToCheck];
    if (typeof configItem === 'undefined') 
        throw new Error(`Environment variable ${envToCheck} is not defined`);

    return configItem;
}
