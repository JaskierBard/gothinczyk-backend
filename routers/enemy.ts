import { Router } from "express";
import { EnemyRecords } from "../records/enemy";

export const enemyRouter = Router();

enemyRouter
  .get("/:enemy_id", async (req, res) => {
    const enemy_id = req.params.enemy_id;
    const result = await EnemyRecords.getEnemy(enemy_id)

    res.json({
      result
    });
  })