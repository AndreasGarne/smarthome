import { injectable } from 'inversify';
import { IConfiguration } from '../models';

@injectable()
export class Configuration implements IConfiguration {
    public MqttHost: string;
    public MqttPort: string;
    public MqttUser: string;
    public MqttPassword: string;
    public ReservedTopicPrefixes: string[];
    public MongoURL: string;
    public MongoAuthSource: string;
    public MongoUser: string;
    public MongoPassword: string;
    public LogLevel: string;

    constructor() {
        this.MqttHost = this.validate("MQTT_HOST");
        this.MqttPort = this.validate("MQTT_PORT");
        this.MqttUser = this.validate("MQTT_USER");
        this.MqttPassword = this.validate("MQTT_PASSWORD");
        this.MongoURL = this.validate("MONGO_URL");
        this.MongoAuthSource = this.validate("MONGO_AUTH_SOURCE");
        this.MongoUser = this.validate("MONGO_USER");
        this.MongoPassword = this.validate("MONGO_PASSWORD");
        this.ReservedTopicPrefixes = this.validate("RESERVED_TOPIC_PREFIXES").split(",");
        this.LogLevel = this.validate("LOG_LEVEL");
    }

    private validate(envToCheck: string): string {
        const configItem = process.env[envToCheck];
        if (typeof configItem === 'undefined') 
            throw new Error(`Environment variable ${envToCheck} is not defined`);

        return configItem;
    }
}