export interface ITasmotaLightState {
    POWER: string,
    Dimmer: number,
    Color: string,
    HSBColor: string,
    White: number,
    CT: number,
    Channel: number[]
}

export function IsTasmotaLightState(objectToTest: any): objectToTest is ITasmotaLightState {
    const valid = Object.keys(objectToTest).length === 7
    && objectToTest.hasOwnProperty("POWER")
    && objectToTest.hasOwnProperty("Dimmer")
    && objectToTest.hasOwnProperty("Color")
    && objectToTest.hasOwnProperty("HSBColor")
    && objectToTest.hasOwnProperty("White")
    && objectToTest.hasOwnProperty("CT")
    && objectToTest.hasOwnProperty("Channel");

    return valid;
}