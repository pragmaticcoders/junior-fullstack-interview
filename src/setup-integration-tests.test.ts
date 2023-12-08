import chai from "chai";
import { AppServices, buildAppServices } from "app/app-services";
import { Knex } from "knex";
import { Table } from "app/storages/DbSchema";
import { buildRouter } from "app/api/controllers/router";
import { Express } from "express";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";
import chaiSubset from "chai-subset";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(chaiSubset);

export type TestApp = { services: AppServices; app: Express };
let testApp: TestApp;

afterEach("Clean up after test", async () => {
  if (testApp && testApp.services.storages.knex) {
    await clearDb(testApp.services.storages.knex);
  }
});

export async function getTestApp() {
  if (!testApp) {
    const testAppServices = await buildAppServices();
    testApp = {
      services: testAppServices,
      app: await buildRouter(testAppServices),
    };
  }
  return testApp;
}

async function clearDb(knex: Knex) {
  await knex(Table.Skills).delete();
}
