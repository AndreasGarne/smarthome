export interface ITasmotaPowerState {
    POWER: string
}

export function IsTasmotaPowerState(objectToTest: any): objectToTest is ITasmotaPowerState {
    const valid = Object.keys(objectToTest).length === 1
    && objectToTest.hasOwnProperty("POWER")

    return valid;
}