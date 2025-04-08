import { Request, Response, NextFunction } from "express"
import { funcerrorpayload } from "../types"
const asyncErrorHandler = (func: funcerrorpayload) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(err => next(err));
    }
}


export default asyncErrorHandler
