import {Request, Response, Router} from "express";
import { BarsStatsRecords } from "../records/barsStats";

export const barsStats = Router();

barsStats
  .get("/", async (req, res) => {
  const id = "865055da-1b49-11ee-af61-581122ba8110";

  const statistic = await BarsStatsRecords.getBarsStats(id);
  res.json({
    statistic,
  });
})