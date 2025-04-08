import config from "../config"
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        stack: config.NODE_ENV === "production" ? null : err.stack,
    });
};

export default errorMiddleware;
