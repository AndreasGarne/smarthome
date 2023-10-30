import { SmarthomeLogger } from "@smarthome/logger";
import { ZigbeeBridgeRepository } from "../repositories";
import { isZigbeePairingStartMessage, isZigbeePairingUpdateMessage } from "./models/zigbee-pairing.model";
import { ZigbeeState, isZigbeeState } from "./models/zigbee-state.model";
import { DeviceRepository } from "../repositories/device-repository";
import { DeviceType, IdType, Protocol, State } from "../repositories/storage-models";

export interface TeleResultService {
    handleMessage(message: any): void;
}

export const createTeleResultService = (
    zbBridgeRepo: ZigbeeBridgeRepository,
    deviceRepo: DeviceRepository,
    logger: SmarthomeLogger
): TeleResultService => {
    const handleZbState = async (zbState: ZigbeeState) => {
        const { ZbState:  message } = zbState;
        if (isZigbeePairingStartMessage(message)) {
            logger.log('info', `Starting pairing.`); // Message: ${JSON.stringify(message, null, 0)}`);
            const device = await deviceRepo.get(message.IEEEAddr, IdType.IEEEAddr);
            if (!device) {
                logger.log('info', `Device not found, adding.`); // Message: ${JSON.stringify(message, null, 0)}`);
                const newDevice = await deviceRepo.add({
                    IEEEAddr: message.IEEEAddr,
                    DeviceId: message.ShortAddr,
                    DeviceType: DeviceType.Unknown,
                    Name: 'unknownDevice',
                    Topic: 'zbbridge',
                    Protocol: Protocol.Zigbee,
                    State: State.Pairing,
                    Room: "unplaced",
                });
                logger.log('debug', `newDevice: ${JSON.stringify(newDevice, null, 0)}`);
                return;
            }
            logger.log('info', `Device found. Message: `); //  ${JSON.stringify(device, null, 0)}`);
            if (message.ShortAddr.toLowerCase() === device.DeviceId) {
                logger.log('info', `Device already paired and has same DeviceId. Message: ${JSON.stringify(message, null, 0)}`);
                return;
            }
            logger.log('info', `Device already paired and has different DeviceId. Message: `); // ${JSON.stringify(device, null, 0)}`);
            await deviceRepo.update({
                DeviceId: message.ShortAddr,
            }, device.id);
            return;
        }
        if (isZigbeePairingUpdateMessage(message)) {
            const device = await deviceRepo.get(message.ShortAddr, IdType.DeviceId);
            if (!device) {
                logger.log('error', `Pairing update with non existin device. Weird`); // ${JSON.stringify(device, null, 0)}`);
                return;
            }
            logger.log('info', `This is a update for device being paired. Message: ${JSON.stringify(device, null, 0)}`);
            await deviceRepo.update({
                PowerSource: message.PowerSource,
                ReceiveWhenIdle: message.ReceiveWhenIdle,
                Security: message.Security,
            }, device.id);
        }
    };
    const handleMessage = (message: any) => {
        if (isZigbeeState(message)) {
            logger.log('info', `isZbstate. Message: ${JSON.stringify(message, null, 0)}`);
            handleZbState(message);
        }
        logger.log('info', `Message handled by TELE/RESULT service. Message: ${JSON.stringify(message, null, 0)}`);
    };

    return {
        handleMessage,
    }
};


// starting: tele/zbbridge/RESULT = {"ZbState":{"Status":34,"IEEEAddr":"0x5C0272FFFE4AB504","ShortAddr":"0x87CD","ParentNetwork":"0x0000","JoinStatus":1,"Decision":0}}
// starting: tele/zbbridge/RESULT = {"ZbState":{"Status":30,"IEEEAddr":"0x5C0272FFFE4AB504","ShortAddr":"0x87CD","PowerSource":false,"ReceiveWhenIdle":false,"Security":false}}
// dont care: tele/zbbridge/RESULT = {"ZbState":{"Status":32,"ActiveEndpoints":["0x01"]}}
// useful info: tele/zbbridge/87CD/SENSOR = {"ZbReceived":{"0x87CD":{"Device":"0x87CD","Name":"Controller","ModelId":"TRADFRI remote control","Manufacturer":"IKEA of Sweden","Endpoint":1,"LinkQuality":120}}}
// meh: tele/zbbridge/RESULT = {"ZbState":{"Status":33,"Device":"0x87CD","Endpoint":"0x01","ProfileId":"0x0104","DeviceId":"0x0820","DeviceVersion":1,"InClusters":["0x0000","0x0001","0x0003","0x0020","0x1000","0xFC7C"],"OutClusters":["0x0003","0x0004","0x0006","0x0008","0x0019","0x1000"]}}
// done: tele/zbbridge/RESULT = {"ZbBind":{"Device":"0x87CD","Name":"Controller","Status":0,"StatusMessage":"SUCCESS"}}
// meh: tele/zbbridge/87CD/SENSOR = {"ZbReceived":{"0x87CD":{"Device":"0x87CD","Name":"Controller","0003!01":"","IdentifyQuery":true,"Endpoint":1,"LinkQuality":92}}}


// starting: tele/zbbridge/RESULT = {"ZbState":{"Status":34,"IEEEAddr":"0x5C0272FFFE4AB504","ShortAddr":"0x87CD","ParentNetwork":"0x0000","JoinStatus":1,"Decision":0}}
// starting: tele/zbbridge/RESULT = {"ZbState":{"Status":30,"IEEEAddr":"0x5C0272FFFE4AB504","ShortAddr":"0x87CD","PowerSource":false,"ReceiveWhenIdle":false,"Security":false}}
// useful info: tele/zbbridge/87CD/SENSOR = {"ZbReceived":{"0x87CD":{"Device":"0x87CD","Name":"Controller","ModelId":"TRADFRI remote control","Manufacturer":"IKEA of Sweden","Endpoint":1,"LinkQuality":120}}}
// done: tele/zbbridge/RESULT = {"ZbBind":{"Device":"0x87CD","Name":"Controller","Status":0,"StatusMessage":"SUCCESS"}}
