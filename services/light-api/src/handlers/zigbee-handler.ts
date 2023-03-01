import { injectable } from "inversify";
import { IBaseHandler } from "./base-handler";

export interface IZigbeeHandler extends IBaseHandler {

}

@injectable()
export class ZigbeeHandler implements IZigbeeHandler {
    
}