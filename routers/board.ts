import {Request, Response, Router} from "express";
import { BoardRecords } from "../records/board";

export const board = Router();

board
  .get("/", async (req, res) => {
  // const id = "865055da-1b49-11ee-af61-581122ba8110";

  const events = await BoardRecords.getAll();
  res.json({
    events,
  });
})