import express, { Express } from "express";
import cors from "cors";
import logger from "app/utils/logger";
import { wrap } from "app/utils/express";
import { errorsMiddleware } from "app/api/middlewares/errors-middleware";
import { healthCheckController } from "app/api/controllers/health-check-controller";
import { AppServices } from "app/app-services";
import { getSkillsController } from "app/api/controllers/get-skills";
import { createSkillController } from "app/api/controllers/create-skill";

export async function buildRouter(services: AppServices): Promise<Express> {
  logger.debug("Building app router");
  // ---
  // start middlewares
  // ---

  const app = express();
  app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());

  // ---
  // routes
  // ---
  app.get("/health", wrap(healthCheckController(services)));

  app.get("/skills", wrap(getSkillsController(services)));
  app.post("/skills", wrap(createSkillController(services)));

  // ---
  // end middlewares
  // ---
  app.use(errorsMiddleware());

  return app;
}
