export interface BridgeStateMessage {
    Time: string,
    Uptime: string,
    UptimeSec: number,
    Vcc: number,
    Heap: number,
    SleepMode: string,
    Sleep: number,
    LoadAvg: number,
    MqttCount: number,
    Wifi: WifiData,
}

export const isBridgeState = (data: BridgeStateMessage): data is BridgeStateMessage => {
    return data.Time !== undefined && typeof data.Time === 'string'
        && data.Uptime !== undefined && typeof data.Uptime == 'string'
        && data.UptimeSec !== undefined && typeof data.UptimeSec == 'number'
        && data.Vcc !== undefined && typeof data.Vcc == 'number'
        && data.Heap !== undefined && typeof data.Heap == 'number'
        && data.SleepMode !== undefined && typeof data.SleepMode == 'string'
        && data.Sleep !== undefined && typeof data.Sleep == 'number'
        && data.LoadAvg !== undefined && typeof data.LoadAvg == 'number'
        && data.MqttCount !== undefined && typeof data.MqttCount == 'number'
        && data.Wifi !== undefined && isWifiData(data.Wifi);
}

interface WifiData {
    AP: number,
    SSId: string,
    BSSId: string,
    Channel: number,
    RSSI: number,
    Signal: number,
    LinkCount: number,
    Downtime: string,
}

export const isWifiData = (data: WifiData): data is WifiData => {
    return data.AP !== undefined && typeof data.AP === 'number'
        && data.SSId !== undefined && typeof data.SSId == 'string'
        && data.BSSId !== undefined && typeof data.BSSId == 'string'
        && data.Channel !== undefined && typeof data.Channel == 'number'
        && data.RSSI !== undefined && typeof data.RSSI == 'number'
        && data.Signal !== undefined && typeof data.Signal == 'number'
        && data.LinkCount !== undefined && typeof data.LinkCount == 'number'
        && data.Downtime !== undefined && typeof data.Downtime == 'string';
}
