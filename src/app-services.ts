import { Knex, knex as buildKnex } from "knex";
import { AppConfig, getAppConfig } from "app/config";
import logger from "app/utils/logger";
import { SkillsDbStorage } from "app/storages/SkillsDbStorage";
import { SkillsMockStorage } from "app/storages/SkillsMockStorage";
import { SkillsStorage } from "app/storages/SkillsStorage";

export type AppServices = {
  appConfig: AppConfig;
  storages: Storages;
};

export const buildAppServices = async (): Promise<AppServices> => {
  logger.info("Building app services");
  const appConfig = await getAppConfig();
  let storages: Storages;
  if (appConfig.dbConfig.client === "mock") {
    storages = createMockStorages();
  } else {
    storages = createStorages(appConfig);
    await startStorages(storages);
  }
  return {
    appConfig,
    storages,
  };
};

const startStorages = async (storages: Storages) => {
  await storages.knex?.raw("CREATE SCHEMA IF NOT EXISTS app;");
  await storages.knex?.migrate.latest();
};

const stopStorages = async (storages: Storages) => {
  await storages.knex?.destroy();
};

const createStorages = (appConfig: AppConfig) => {
  const knex = buildKnex(appConfig.dbConfig);
  const skillsStorage = new SkillsDbStorage(knex);

  return {
    knex,
    skillsStorage,
  };
};

const createMockStorages = (): Storages => {
  return {
    knex: null,
    skillsStorage: new SkillsMockStorage(),
  };
};

export type Storages = {
  knex: Knex | null;
  skillsStorage: SkillsStorage;
};
