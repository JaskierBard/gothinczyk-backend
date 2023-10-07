import { pool } from "../utils/db";
import { SqueresEntity } from "../types";
import { FieldPacket } from "mysql2";
import { EnemyRecords } from "./enemy";

type SqueresResults = [SqueresRecords[], FieldPacket[]];

export class SqueresRecords implements SqueresEntity {
  lp: string;
  base: string;
  type: string;
  enemyId: string;
  enemyImg: string;
  enemyHp: string;
  chest: boolean;
  lootId: string;

  constructor(obj: SqueresEntity) {
    this.lp = obj.lp;
    this.base = obj.base;
    this.type = obj.type;
    this.enemyId = obj.enemyId;
    this.enemyImg = obj.enemyImg;
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

  static async removeAll() {
    const [results] = (await pool.execute(
      "UPDATE `squeres` SET enemyId = NULL, enemyImg ='', enemyHp = NULL, chest = NULL, lootId = NULL WHERE `enemyId` IS NOT NULL;"
    )) as SqueresResults;
      if (results == undefined) {
        console.log('empty')
        return 'empty';
      }
  }

  static async addMany() {

    const enemy = await EnemyRecords.getRandomEnemy();
    const randomNumber = Math.floor(Math.random() * (89 - 1 + 1)) + 1;

    await pool.execute(
      "UPDATE `squeres` SET enemyId = :enemyId, enemyImg = :enemyImg, enemyHp = :enemyHp WHERE `lp` = :lp;",
      {
        lp: randomNumber,
        enemyId: enemy[0].enemy_id,
        enemyImg: enemy[0].img,
        enemyHp: enemy[0].health_points,
      }
    ) as SqueresResults;

    return 200;
  }

  static async addOne(lp: number,  enemy_id: string) {
    const [results] = (await pool.execute(
      "UPDATE `squares` SET enemyId = NULL, enemyImg = NULL, enemyHp = NULL, chest = NULL, lootId = NULL WHERE `lp` = :lp;",
      {
        lp: lp,
      }
    )) as SqueresResults;

    return results.map((obj) => new SqueresRecords(obj));
  }

  static async removeOne(lp: number) {
    const [results] = (await pool.execute(
      "UPDATE `squares` SET enemyId = NULL, enemyImg = NULL, enemyHp = NULL, chest = NULL, lootId = NULL WHERE `lp` = :lp;",
      {
        lp: lp,
      }
    )) as SqueresResults;

    return results.map((obj) => new SqueresRecords(obj));
  }
}
