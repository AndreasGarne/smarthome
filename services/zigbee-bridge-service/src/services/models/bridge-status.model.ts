export interface BridgeStatus {
    Status: any;//{"Module":75,"DeviceName":"Tasmota","FriendlyName":["Tasmota"],"Topic":"zbbridge","ButtonTopic":"0","Power":0,"PowerOnState":3,"LedState":1,"LedMask":"FFFF","SaveData":1,"SaveState":1,"SwitchTopic":"0","SwitchMode":[0,0,0,0,0,0,0,0],"ButtonRetain":0,"SwitchRetain":0,"SensorRetain":0,"PowerRetain":0,"InfoRetain":0,"StateRetain":0}
};
export const isBridgeStatus = (data: BridgeStatus): data is BridgeStatus => {
    return data.hasOwnProperty("Status");
}
export interface BridgeStatusPRM {
    StatusPRM: any;//{"Baudrate":115200,"SerialConfig":"8N1","GroupTopic":"tasmotas","OtaUrl":"http://ota.tasmota.com/tasmota/release/tasmota.bin.gz","RestartReason":"Software/System restart","Uptime":"1T11:12:51","StartupUTC":"2023-07-04T08:38:50","Sleep":50,"CfgHolder":4617,"BootCount":989,"BCResetTime":"2021-04-13T14:24:31","SaveCount":1107,"SaveAddress":"FC000"}
};
export const isBridgeStatusPRM = (data: BridgeStatusPRM): data is BridgeStatusPRM => {
    return data.hasOwnProperty("StatusPRM");
}
export interface BridgeStatusFWR {
    StatusFWR: any;//{"Version":"9.3.1.2(zbbridge)","BuildDateTime":"2021-04-13T10:53:57","Boot":7,"Core":"2_7_4_9","SDK":"2.2.2-dev(38a443e)","CpuFrequency":160,"Hardware":"ESP8266EX","CR":"379/699"}
};
export const isBridgeStatusFWR = (data: BridgeStatusFWR): data is BridgeStatusFWR => {
    return data.hasOwnProperty("StatusFWR");
}
export interface BridgeStatusLOG {
    StatusLOG: any;//{"SerialLog":0,"WebLog":2,"MqttLog":0,"SysLog":0,"LogHost":"","LogPort":514,"SSId":["JohannaS",""],"TelePeriod":300,"Resolution":"558180C0","SetOption":["00008009","2805C8000100060000005A00000000000000","00000080","00006080","00000000"]}
};
export const isBridgeStatusLOG = (data: BridgeStatusLOG): data is BridgeStatusLOG => {
    return data.hasOwnProperty("StatusLOG");
}
export interface BridgeStatusMEM {
    StatusMEM: any;//{"ProgramSize":577,"Free":1212,"Heap":24,"ProgramFlashSize":2048,"FlashSize":2048,"FlashChipId":"1540A1","FlashFrequency":40,"FlashMode":3,"Features":["00000809","0F1007C4","04400001","00000002","00000000","00000000","00020000","00000000","00000000"],"Drivers":"1,2,7,9,10,20,23,41","Sensors":""}
};
export const isBridgeStatusMEM = (data: BridgeStatusMEM): data is BridgeStatusMEM => {
    return data.hasOwnProperty("StatusMEM");
}
export interface BridgeStatusNET {
    StatusNET: any;//{"Hostname":"zbbridge-0428","IPAddress":"192.168.1.62","Gateway":"192.168.1.1","Subnetmask":"255.255.255.0","DNSServer":"192.168.1.1","Mac":"98:F4:AB:E3:21:AC","Webserver":2,"WifiConfig":0,"WifiPower":17.0}
};
export const isBridgeStatusNET = (data: BridgeStatusNET): data is BridgeStatusNET => {
    return data.hasOwnProperty("StatusNET");
}
export interface BridgeStatusMQT {
    StatusMQT: any;//{"MqttHost":"192.168.1.197","MqttPort":1883,"MqttClientMask":"ZigbeeBridge","MqttClient":"ZigbeeBridge","MqttUser":"smarthomeapi","MqttCount":1,"MAX_PACKET_SIZE":1200,"KEEPALIVE":30,"SOCKET_TIMEOUT":4}
};
export const isBridgeStatusMQT = (data: BridgeStatusMQT): data is BridgeStatusMQT => {
    return data.hasOwnProperty("StatusMQT");
}
export interface BridgeStatusTIM {
    StatusTIM: any;//{"UTC":"2023-07-05T19:51:41","Local":"2023-07-05T20:51:41","StartDST":"2023-03-26T02:00:00","EndDST":"2023-10-29T03:00:00","Timezone":"+01:00","Sunrise":"04:53","Sunset":"20:55"}
};
export const isBridgeStatusTIM = (data: BridgeStatusTIM): data is BridgeStatusTIM => {
    return data.hasOwnProperty("StatusTIM");
}
export interface BridgeStatusSNS {
    StatusSNS: any; //{"Time":"2023-07-05T20:51:41"}
};
export const isBridgeStatusSNS = (data: BridgeStatusSNS): data is BridgeStatusSNS => {
    return data.hasOwnProperty("StatusSNS");
}
export interface BridgeStatusSTS {
    StatusSTS: any;//{"Time":"2023-07-05T20:51:41","Uptime":"1T11:12:51","UptimeSec":126771,"Vcc":3.391,"Heap":24,"SleepMode":"Dynamic","Sleep":50,"LoadAvg":19,"MqttCount":1,"Wifi":{"AP":1,"SSId":"JohannaS","BSSId":"24:5A:4C:8C:DC:7E","Channel":11,"RSSI":62,"Signal":-69,"LinkCount":1,"Downtime":"0T00:00:08"}}
};
export const isBridgeStatusSTS = (data: BridgeStatusSTS): data is BridgeStatusSTS => {
    return data.hasOwnProperty("StatusSTS");
}
