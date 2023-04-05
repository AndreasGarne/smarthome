import { IConfiguration } from '../models';

export class Configuration implements IConfiguration {
    public ApiPort: string;
    public MqttHost: string;
    public MqttUser: string;
    public MqttPassword: string;
    public MongoURL: string;
    public MongoAuthSource: string;
    public MongoUser: string;
    public MongoPassword: string;

    constructor() {
        this.ApiPort = this.validate("API_PORT");
        this.MqttHost = this.validate("MQTT_HOST");
        this.MqttUser = this.validate("MQTT_USER");
        this.MqttPassword = this.validate("MQTT_PASSWORD");
        this.MongoURL = this.validate("MONGO_URL");
        this.MongoAuthSource = this.validate("MONGO_AUTH_SOURCE");
        this.MongoUser = this.validate("MONGO_USER");
        this.MongoPassword = this.validate("MONGO_PASSWORD");
    }

    private validate(envToCheck: string): string {
        const configItem = process.env[envToCheck];
        if (typeof configItem === 'undefined')
            throw new Error(`Environment variable ${envToCheck} is not defined`);

        return configItem;
    }
}