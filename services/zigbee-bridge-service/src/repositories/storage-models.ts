/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface Device {
  Name?: string;
  DeviceId?: string;
  IEEEAddr?: string;
  ModelId?: string;
  Manufacturer?: string;
  DeviceType?: DeviceType;
  Topic?: string;
  Ip?: string;
  Room?: string;
  GroupTopic?: string;
  Time?: string;
  Uptime?: string;
  UptimeSec?: number;
  Heap?: number;
  SleepMode?: string;
  Sleep?: number;
  LoadAvg?: number;
  MqttCount?: number;
  Endpoint?: number;
  LinkQuality?: number;
  Reachable?: boolean;
  LastSeen?: number;
  LastSeenEpoch?: number;
  Commands?: any[];
  Protocol?: Protocol;
  ReceiveWhenIdle?: boolean;
  PowerSource?: boolean;
  Security?: boolean;
  State?: State;
}

export interface DeviceTypeUpdateRequestV1 {
  DeviceType: DeviceType;
}

export enum DeviceType {
  Light = "Light",
  Switch = "Switch",
  ZigbeeBridge = "ZigbeeBridge",
  Controller = "Controller",
  Device = "Device",
  Unknown = "Unknown",
}

export enum State {
  Active = "Active",
  Inactive = "Inactive",
  Pairing = "Pairing",
  Waiting = "Waiting",
}

export enum Protocol {
  Zigbee = "Zigbee",
  Tasmota = "Tasmota",
}

export enum IdType {
  DeviceId = "DeviceId",
  IEEEAddr = "IEEEAddr",
}

export interface Command {
  CommandType?: string;
  Name: string;
  Payload: string;
  Type: string;
  Validation: string;
  Arguments: string;
  TopicPrefix: string;
  TopicSuffix: string;
  IsXYColour?: boolean;
  IsZigbee?: boolean;
  IsTasmota?: boolean;
  ZigbeeCommand?: string;
}

export interface ColourData {
  Color: string;
  HSBColor: string | null;
  X: number | null;
  Y: number | null;
  ColorMode: number | null;
  RGB: string;
  RGBb: string | null;
}

export type Light = Device & {
  POWER?: string;
  Dimmer?: number;
  Colour?: ColourData;
  White?: number;
  MinCT?: number;
  MaxCT?: number;
  CT?: number;
  Channel?: number[];
  Scheme?: number;
  Fade?: string;
  Speed?: number;
  LedTable?: string;
};

export type Switch = object;

export type ZigbeeBridge = Device & {
  AttachedDevices: string[];
};

export type GetLightResponseV1 = object;

export type GetAllLightsResponseV1 = object;

export type CreateLightRequestV1 = Light &
  UtilRequiredKeys<Device, "Name" | "DeviceId" | "DeviceType" | "Topic" | "Room">;

export type CreateLightResponseV1 = Light &
  UtilRequiredKeys<Device, "Name" | "DeviceId" | "DeviceType" | "Topic" | "Room"> & {
    id: string;
  };

export type CreateZigbeeBridgeResponseV1 = object;

export type GetAllZigbeeBridgesResponseV1 = object;

export type CreateDeviceRequestV1 = UtilRequiredKeys<Device, "Name" | "DeviceId" | "DeviceType" | "Topic" | "Room">;

export type GetDeviceResponseV1 = UtilRequiredKeys<Device, "Name" | "DeviceId" | "DeviceType" | "Topic" | "Room"> & {
  id: string;
};

export type GetAllDevicesResponseV1 = GetDeviceResponseV1[];

export type CreateDeviceResponseV1 = UtilRequiredKeys<Device, "Name" | "DeviceId" | "DeviceType" | "Topic" | "Room"> & {
  id: string;
};
