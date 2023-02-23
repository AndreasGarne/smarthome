import { injectable, inject } from 'inversify';

export interface IConfiguration {
    MqttHost: string;
    MqttPort: string;
    MqttUser: string;
    MqttPassword: string;
    ReservedTopicPrefixes: string[];
}

@injectable()
export class Configuration implements IConfiguration {
    public MqttHost: string;
    public MqttPort: string;
    public MqttUser: string;
    public MqttPassword: string;
    public ReservedTopicPrefixes: string[];

    constructor() {
        this.MqttHost = this.validate("MQTT_HOST");
        this.MqttPort = this.validate("MQTT_PORT");
        this.MqttUser = this.validate("MQTT_USER");
        this.MqttPassword = this.validate("MQTT_PASSWORD");
        this.ReservedTopicPrefixes = this.validate("RESERVED_TOPIC_PREFIXES").split(",");
    }

    private validate(envToCheck: string): string {
        const configItem = process.env[envToCheck];
        if (typeof configItem === 'undefined') 
            throw new Error(`Environment variable ${envToCheck} is not defined`);

        return configItem;
    }
}