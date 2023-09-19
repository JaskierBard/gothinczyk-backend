import { pool } from "../utils/db";
import { SqueresEntity } from "../types";
import { FieldPacket } from "mysql2";

type SqueresResults = [SqueresRecords[], FieldPacket[]];

export class SqueresRecords implements SqueresEntity {
  lp:string;
  type:string;
  enemyId:string;
  enemyHp:string;
  chest:boolean;
  lootId:string;

  constructor(obj: SqueresEntity) {
    this.lp = obj.lp;
    this.type = obj.type;
    this.enemyId = obj.enemyId;
    this.enemyHp = obj.enemyHp;
    this.chest = obj.chest;
    this.lootId = obj.lootId;
  }

  static async getAll() {
    const [results] = (await pool.execute(
      "SELECT * FROM `squeres`"
    )) as SqueresResults;

    return results.map((obj) => new SqueresRecords(obj));
  }
}
