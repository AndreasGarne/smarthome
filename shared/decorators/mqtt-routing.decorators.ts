interface IControllerFunction {
    func: (...args: any[]) => void,
    neededService: string
}

export class MqttDecorator {
    static allMqttRoutes: Map<string, IControllerFunction> = new Map();

    static MqttRoute = (decoratorArg: string, serviceInterfaceName: string) => (
        target: Object,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>
    ): any => {
        MqttDecorator.allMqttRoutes.set(decoratorArg, { func: descriptor.value as (...args: any[]) => void, neededService: serviceInterfaceName })
    };


}