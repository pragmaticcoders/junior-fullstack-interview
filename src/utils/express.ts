import { NextFunction, Request, RequestHandler, Response } from "express";

export function wrap<T extends RequestHandler>(fn: T) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve()
      .then(() => fn(req as any, res, next))
      .catch(next);
}
