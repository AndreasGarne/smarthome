import { injectable } from 'inversify';

export interface IConfiguration {
    ApiPort: string;
    MqttHost: string;
    MqttUser: string;
    MqttPassword: string;
}

@injectable()
export class Configuration implements IConfiguration {
    public ApiPort: string;
    public MqttHost: string;
    public MqttUser: string;
    public MqttPassword: string;

    constructor() {
        this.ApiPort = this.validate("API_PORT");
        this.MqttHost = this.validate("MQTT_HOST");
        this.MqttUser = this.validate("MQTT_USER");
        this.MqttPassword = this.validate("MQTT_PASSWORD");
    }

    private validate(envToCheck: string): string {
        const configItem = process.env[envToCheck];
        if (typeof configItem === 'undefined')
            throw new Error(`Environment variable ${envToCheck} is not defined`);

        return configItem;
    }
}