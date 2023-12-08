import chai, { expect, request } from "chai";
import { GetSkillsResponse } from "app/api/controllers/get-skills";
import { getTestApp, TestApp } from "app/setup-integration-tests.test";

describe("getSkillsController", () => {
  let testApp: TestApp;
  let agent: ChaiHttp.Agent;

  beforeEach(async () => {
    testApp = await getTestApp();
    agent = chai.request.agent(testApp.app);
  });

  it("should return list of skills", async () => {
    await testApp.services.storages.skillsStorage.insert({
      name: "TypeScript",
      rate: 8,
    });

    await testApp.services.storages.skillsStorage.insert({
      name: "NodeJS",
      rate: 7,
    });

    const response = await agent.get("/skills");
    const responseBody = response.body as GetSkillsResponse;

    expect(responseBody.skills.length).to.be.eq(2);
  });
});
