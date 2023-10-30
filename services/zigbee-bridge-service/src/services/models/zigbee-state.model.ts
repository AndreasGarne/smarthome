export interface ZigbeeState {
    ZbState: any;
}

export const isZigbeeState = (data: ZigbeeState): data is ZigbeeState => {
    if (Object.keys(data).length !== 1) {
        return false;
    }
    return data.hasOwnProperty("ZbState");
};