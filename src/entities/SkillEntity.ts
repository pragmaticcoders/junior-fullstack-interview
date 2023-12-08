import { z } from 'zod';

export const skillEntitySchema = z.object({
  skillId: z.number(),
  name: z.string().nonempty(),
  rate: z.number().int(),
  updatedAt: z.date()
})

export type SkillEntity = z.infer<typeof skillEntitySchema>;
