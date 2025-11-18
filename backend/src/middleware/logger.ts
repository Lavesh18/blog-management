import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${
        res.statusCode
      } - ${Date.now() - start}ms`
    );
  });

  next();
};
