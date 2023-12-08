import { Knex } from "knex";
import { SkillEntity, skillEntitySchema } from "app/entities/SkillEntity";
import { Table } from "app/storages/DbSchema";
import { z } from "zod";
import { SkillsStorage } from "app/storages/SkillsStorage";

export class SkillsDbStorage implements SkillsStorage {
  constructor(private readonly database: Knex) {}

  async getAll(): Promise<SkillEntity[]> {
    const result = await this.database(Table.Skills).select("*");

    return z.array(skillEntitySchema).parse(result);
  }

  async insert(data: Omit<SkillEntity, "skillId" | "updatedAt">): Promise<SkillEntity> {
    const [result] = await this.database(Table.Skills)
      .insert({
        name: data.name,
        rate: data.rate,
      })
      .returning("*");

    return skillEntitySchema.parse(result);
  }
}
