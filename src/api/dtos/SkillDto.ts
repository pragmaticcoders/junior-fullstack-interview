import { z } from "zod";
import { SkillEntity } from "app/entities/SkillEntity";

export const skillDtoSchema = z.object({
  skillId: z.number(),
  name: z.string().nonempty(),
  rate: z.number().int(),
  updatedAt: z.string(),
});

export type SkillDto = z.infer<typeof skillDtoSchema>;

export function toSkillDto(entity: SkillEntity): SkillDto {
  return {
    ...entity,
    updatedAt: entity.updatedAt.toISOString(),
  };
}
