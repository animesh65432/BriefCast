import { Request, Response, NextFunction } from "express"

export type funcerrorpayload = (req: Request, res: Response, next: NextFunction) => Promise<void>