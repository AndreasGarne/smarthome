export const flattenZigbeePayload = (payload: any): any => {
    if (!isObject(payload)) {
        console.log("This zigbee payload is not and object, Payload");
        return payload;
    }

    return Object.keys(payload).reduce((acc, curr) => {
        if (isObject(payload[curr]))
            return { ...acc, ...flattenZigbeePayload(payload[curr]) }
        return {...acc, [curr]: payload[curr] };
    }, {});
}

const isObject = (testValue: any): boolean => {
    return typeof testValue === 'object' &&
        !Array.isArray(testValue) &&
        testValue !== null
}