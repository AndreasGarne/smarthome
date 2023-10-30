import { z } from "zod";

export const remoteControlMessageSchema = z.object({
  Device: z.string(),
  Name: z.string(),
  Endpoint: z.number(),
  LinkQuality: z.number(),
  Operation: z.string(),
});

export const remoteControlPayloadSchema = z.object({
  ZbReceived: z.record(
      z.string(),
      z.object({}),
    )
    .refine((val) => Object.keys(val).length === 1, { message: 'ZbReceived must have exactly 1 node.' }),
});

export type RemoteControlMessage = z.infer<typeof remoteControlMessageSchema>;
export type RemoteControlPayload = z.infer<typeof remoteControlPayloadSchema>;
