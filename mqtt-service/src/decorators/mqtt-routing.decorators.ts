export class MqttDecorator {
    static allMqttRoutes: Map<string, (...args: any[]) => void> = new Map();

    static MqttRoute = (decoratorArg: string) => (
        target: Object, 
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>
        ): any => {
            console.log(decoratorArg);
            MqttDecorator.allMqttRoutes.set(decoratorArg, descriptor.value as (...args: any[]) => void)
        };
}