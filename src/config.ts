import { createEnvReader } from "app/utils";
import { join } from "path";
import { Knex } from "knex";
import { AsyncReturnType } from "app/utils/types";

export enum Environment {
  local = "local",
  dev = "dev",
  prod = "prod",
  test = "test",
}

export type AppConfig = AsyncReturnType<typeof getAppConfig>;

export async function getAppConfig() {
  const envReader = createEnvReader(process.env);
  const { readRequiredString, readOptionalBool } = envReader;

  const environment = readRequiredString("ENVIRONMENT") as Environment;

  const useDbMock = readOptionalBool("USE_DB_MOCK", false);
  return {
    environment,
    useDbMock,
    dbConfig: await getDbConfig(useDbMock),
  };
}

function getDbConfig(useMock: boolean): Knex.Config {
  if (useMock) {
    return {
      client: "mock",
    };
  }

  return {
    client: "pg",
    connection: `postgres://${process.env.PGUSER}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE_TEST}`,
    migrations: {
      directory: join(__dirname, "./migrations"),
      loadExtensions: [".ts"],
      schemaName: "app",
    },
  };
}
