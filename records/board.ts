import { pool } from "../utils/db";
import { BoardEntity } from "../types";
import { FieldPacket } from "mysql2";

type BoardResults = [BoardRecords[], FieldPacket[]];

export class BoardRecords implements BoardEntity {
  id: string;
  event_id: string;
  position: number;
  type: number;
  hp?: number;
  mana?: number;
  img:string

  constructor(obj: BoardEntity) {
    this.id = obj.id;
    this.event_id = obj.event_id;
    this.position = obj.position;
    this.type = obj.type;
    this.hp = obj.hp;
    this.mana = obj.mana;
    this.img = obj.img;
  }

  static async getAll() {
    const [results] = (await pool.execute(
      "SELECT * FROM `board`"
    )) as BoardResults;

    return results.map((obj) => new BoardRecords(obj));
  }
}
