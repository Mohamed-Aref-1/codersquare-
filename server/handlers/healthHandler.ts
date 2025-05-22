import { Request, Response } from "express";

export const healthzHandler = async (req: Request, res: Response) => {
    res.status(200).send("Server is running fine  👍" );
};


