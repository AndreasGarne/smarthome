const TYPES = {
    ILogger: Symbol.for("ILogger"),
    IConfiguration: Symbol.for("IConfiguration"),
    ILightService: Symbol.for("ILightService"),
    ILightRepository: Symbol.for("ILightRepository"),
    IMqttClient: Symbol.for("IMqttClient")
};

export { TYPES };