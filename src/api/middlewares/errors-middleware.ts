import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "app/utils/errors";
import logger from "app/utils/logger";

export function errorsMiddleware() {
  return async (err: any, req: Request, res: Response, _next: NextFunction) => {
    const logRequest = {
      method: req.method,
      url: req.originalUrl,
      organizationId: res.locals.organizationId,
    };

    if (err instanceof HttpErrorResponse) {
      logger.error("HttpErrorResponse", err);
      res.status(err.statusCode).send(err.body);
      return;
    }

    const status = Number(err.statusCode) || Number(err.status) || 500;

    logger.error("Unhandled error", {
      request: logRequest,
      status,
      err,
      errS: err.toString ? err.toString() : "",
    });
    res.sendStatus(status);
  };
}
