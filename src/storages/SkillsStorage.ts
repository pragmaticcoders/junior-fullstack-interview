import { SkillEntity } from "app/entities/SkillEntity";

export interface SkillsStorage {
  getAll(): Promise<SkillEntity[]>;
  insert(data: Omit<SkillEntity, "skillId" | "updatedAt">): Promise<SkillEntity>;
}
