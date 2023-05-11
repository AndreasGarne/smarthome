export interface IZigbeeSensorPayload {
    ZbReceived: {
        [key: string]: IZigbeeSensorData;
    }
}

export interface IZigbeeSensorData {
    Device: string;
    Name: string;
    Humidity?: number;
    Temperature?: number;
    Endpoint: number;
    LinkQuality: number;
}
