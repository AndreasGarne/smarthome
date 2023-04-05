import { NextFunction, Request, Response } from 'express'

export const getSwitches = async (req: Request, res: Response, next: NextFunction) => {
    res.send({response: "PScht"});
}