export interface configuration {
    MqttHost: string;
    MqttPort: string;
    MqttUser: string;
    MqttPassword: string;
    LogLevel: string;
}

export const createConfig = (): configuration => {
    return {
        MqttHost: validate("MQTT_HOST"),
        MqttPort: validate("MQTT_PORT"),
        MqttUser: validate("MQTT_USER"),
        MqttPassword: validate("MQTT_PASSWORD"),
        LogLevel: validate("LOG_LEVEL"),
    }
}

const validate = (envToCheck: string): string => {
    const configItem = process.env[envToCheck];
    if (typeof configItem === 'undefined') 
        throw new Error(`Environment variable ${envToCheck} is not defined`);

    return configItem;
}
