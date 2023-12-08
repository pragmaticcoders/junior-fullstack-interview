import { createServer } from "http";

import { buildRouter } from "app/api/controllers/router";
import { buildAppServices } from "app/app-services";
import logger from "app/utils/logger";

async function main() {
  const httpPort = 8082;
  const appServices = await buildAppServices();

  const router = await buildRouter(appServices);

  const server = createServer(router);
  server.listen(httpPort, () => {
    logger.info(
      `Server is running at http://localhost:${httpPort} in ${appServices.appConfig.environment} mode`
    );
  });
  return Promise.resolve();
}

main()
  .then(() => logger.info("Server running"))
  .catch(err => {
    logger.error("Server failed", err);
    process.exit(1);
  });
