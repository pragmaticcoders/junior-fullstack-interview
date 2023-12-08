import { Request, Response } from "express";
import { AppServices } from "app/app-services";
import logger from "app/utils/logger";

export const healthCheckController = (app: AppServices) => {
  return async (req: Request<{}, {}, {}, {}>, res: Response<{}>) => {
    let dbError;
    try {
      await app.storages.knex?.raw(`SELECT 1;`);
    } catch (e) {
      dbError = e.message;
      logger.error("Health check db connection error", { dbError: e.message });
    }
    const data = {
      env: app.appConfig.environment,
      db: {
        useMocks: app.appConfig.useDbMock,
        isOk: !dbError,
        error: dbError,
      },
    };

    return res.status(200).send(data);
  };
};
