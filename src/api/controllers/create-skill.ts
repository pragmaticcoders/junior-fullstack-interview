import { Request, Response } from "express";
import { AppServices } from "app/app-services";
import { SkillDto, toSkillDto } from "app/api/dtos/SkillDto";

export const createSkillController = (app: AppServices) => {
  return async (req: Request<{}, {}, { name: string; rate: number }, {}>, res: Response<SkillDto>) => {
    const requestBody = req.body;
    if(requestBody.rate > 10 || requestBody.rate < 0) {
      throw new Error("Invalid skill rate");
    }
    const createdSkill = await app.storages.skillsStorage.insert(requestBody);

    return res.status(200).send(toSkillDto(createdSkill));
  };
};
