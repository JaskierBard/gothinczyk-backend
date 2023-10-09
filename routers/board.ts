import {Request, Response, Router} from "express";
import { BoardRecords } from "../records/board";
import { SqueresRecords } from "../records/squeres";

export const board = Router();

board
  .get("/", async (req, res) => {
  // const id = "865055da-1b49-11ee-af61-581122ba8110";

  const events = await SqueresRecords.getAll();
  res.json({
    events,
  });
})

.post("/remove_all", async (req, res) => {
  const results = await SqueresRecords.removeAll();
  res.json({
    results,
  });
})

.post("/add_many", async (req, res) => {

  const events = await SqueresRecords.addMany(7);
  res.json({
    events,
  });
})