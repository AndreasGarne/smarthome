import { ILight } from "../models";
import { IDevice } from "../models/device-model";

export const flattenZigbeePayload = (payload: any): any => {
    if (!isObject(payload)) {
        console.log("This zigbee payload is not and object, Payload");
        return payload;
    }

    return {
        ...Object.keys(payload).reduce((acc, curr) => {
            if (isObject(payload[curr]))
                return { ...acc, ...flattenZigbeePayload(payload[curr]) }
            return { ...acc, [curr]: payload[curr] };
        }, {}),
    };
}

export const mapZigbeeDeviceProperties = <T extends ILight>(payload: any): T => {
    // ZBLight IKEA
    // Device: '0x3C5E',
    // Power: 1,
    return {
        ...payload,
        POWER: payload.Power,
        DeviceId: payload.Device.toLowerCase().replace('0x', ''),
    };
}

const isObject = (testValue: any): boolean => {
    return typeof testValue === 'object' &&
        !Array.isArray(testValue) &&
        testValue !== null
}

