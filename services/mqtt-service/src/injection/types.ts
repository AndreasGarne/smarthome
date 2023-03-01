const TYPES = {
    ILightController: Symbol.for("ILightController"),
    IMqttRouter: Symbol.for("IMqttRouter"),
    IConfiguration: Symbol.for("IConfiguration"),
    ILightRepository: Symbol.for("ILightRepository"),
    ILightService: Symbol.for("ILightService"),
    IDeviceRepository: Symbol.for("IDeviceRepository"),
    IZigbeeDeviceController: Symbol.for("IZigbeeDeviceController"),
    IZigbeeBridgeController: Symbol.for("IZigbeeBridgeController")
};

export { TYPES };