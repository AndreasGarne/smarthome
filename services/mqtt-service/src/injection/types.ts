const TYPES = {
    ILightController: Symbol.for("ILightController"),
    IMqttRouter: Symbol.for("IMqttRouter"),
    IConfiguration: Symbol.for("IConfiguration"),
    ILightRepository: Symbol.for("ILightRepository"),
    ILightService: Symbol.for("ILightService"),
    IDeviceRepository: Symbol.for("IDeviceRepository"),
    IZigbeeDeviceController: Symbol.for("IZigbeeDeviceController"),
    IZigbeeBridgeController: Symbol.for("IZigbeeBridgeController"),
    IDeviceService: Symbol.for("IDeviceService"),
    ITermoHygroController: Symbol.for("ITermoHygroController"),
    IThermoHygroService: Symbol.for("IThermoHygroService"),
    IThermometerRepository: Symbol.for("IThermometerRepository"),
    IHygrometerRepository: Symbol.for("IHygrometerRepository"),
    ILogger: Symbol.for("ILogger"),
    IRemoteService: Symbol.for("IRemoteService"),
    IRemoteRepository: Symbol.for("IRemoteRepository"),
    IRemoteController: Symbol.for("IRemoteController"),
};

export { TYPES };