import { Request, Response } from "express";
import { AppServices } from "app/app-services";
import { SkillDto, toSkillDto } from "app/api/dtos/SkillDto";

export const getSkillsController = (app: AppServices) => {
  return async (req: Request<{}, {}, {}, {}>, res: Response<GetSkillsResponse>) => {
    const skills = await app.storages.skillsStorage.getAll();

    return res.status(200).send({ skills: skills.map(toSkillDto) });
  };
};

export type GetSkillsResponse = {
  skills: SkillDto[];
};
