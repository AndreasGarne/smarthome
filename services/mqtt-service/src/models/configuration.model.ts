export interface IConfiguration {
    MqttHost: string;
    MqttPort: string;
    MqttUser: string;
    MqttPassword: string;
    MongoURL: string;
    MongoAuthSource: string;
    MongoUser: string;
    MongoPassword: string;
    ReservedTopicPrefixes: string[];
}