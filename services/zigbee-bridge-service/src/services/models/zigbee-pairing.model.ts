interface ZigbeePairingBase {
  Status: number;
  IEEEAddr: string;
  ShortAddr: string;
}

export interface ZigbeePairingStartMessage extends ZigbeePairingBase {
  ParentNetwork: string;
  JoinStatus: number;
  Decision: number;
}

export const isZigbeePairingStartMessage = (
  data: ZigbeePairingStartMessage
): data is ZigbeePairingStartMessage => {
  if (Object.keys(data).length !== 6) {
    return false;
  }

  return (
    data.hasOwnProperty("Status") &&
    data.Status === 34 &&
    data.hasOwnProperty("IEEEAddr") &&
    data.hasOwnProperty("ShortAddr") &&
    data.hasOwnProperty("ParentNetwork") &&
    data.hasOwnProperty("JoinStatus") &&
    data.hasOwnProperty("Decision")
  );
};

export interface ZigbeePairingUpdateMessage extends ZigbeePairingBase {
  PowerSource: boolean;
  ReceiveWhenIdle: boolean;
  Security: boolean;
}

export const isZigbeePairingUpdateMessage = (
  data: ZigbeePairingUpdateMessage
): data is ZigbeePairingUpdateMessage => {
  if (Object.keys(data).length !== 6) {
    return false;
  }

  return (
    data.hasOwnProperty("Status") &&
    data.Status === 30 &&
    data.hasOwnProperty("IEEEAddr") &&
    data.hasOwnProperty("ShortAddr") &&
    data.hasOwnProperty("PowerSource") &&
    data.hasOwnProperty("ReceiveWhenIdle") &&
    data.hasOwnProperty("Security")
  );
};

