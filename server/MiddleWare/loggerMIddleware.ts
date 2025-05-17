import { Request, Response, NextFunction } from "express";

export const requestloggermiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.path, "- body:", req.body);
    next();
};

