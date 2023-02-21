import { IIncomingTasmotaTopic } from '../models';;

export interface ITasmotaController {
    HandleTasmotaMessage(topicData: IIncomingTasmotaTopic, message: Buffer, correlationId: string): void;

}

export class TasmotaController implements ITasmotaController {
    public HandleTasmotaMessage(topicData: IIncomingTasmotaTopic, message: Buffer, correlationId: string): void {
        console.log(`Tasmota message with this type: ${topicData.messageType}`);
    }  
}