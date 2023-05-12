interface IControllerFunction {
    functionToCall: (...args: any[]) => void,
    functionName: string,
    controllerName: string
}

export class MqttDecorator {
    static allMqttRoutes: Map<string, IControllerFunction> = new Map();

    static MqttRoute = (decoratorArg: string, controllerInterfaceName: string) => (
        target: Object,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>
    ): any => {
        // console.log(target);
        // console.log(propertyKey);
        // console.log(descriptor);
        MqttDecorator.allMqttRoutes.set(
            decoratorArg,
            {
                functionToCall: descriptor.value as (...args: any[]) => void,
                functionName: propertyKey,
                controllerName: controllerInterfaceName
            })
    };
}