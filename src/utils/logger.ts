import { createLogger, transports, format, Logger } from "winston";
import { Format } from "logform";

const env = process.env.ENVIRONMENT || "local";
const appVersion = process.env.APP_VERSION || "no-version-env";
const level = process.env.LOG_LEVEL || "info";

export function createDefaultLogger(): Logger {
  return createLogger({
    level,
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          createEnvFormat(),
          ...(env === "local"
            ? [format.align(), format.colorize(), format.simple()]
            : [format.json()])
        ),
      }),
    ],
  });
}

const logger = createDefaultLogger();
export default logger;

function createEnvFormat(): Format {
  return {
    transform: logObj => {
      logObj.environment = env;
      logObj.appVersion = appVersion;
      return logObj;
    },
  };
}
