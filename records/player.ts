import { pool } from "../utils/db";
import { PlayerEntity } from "../types";
import { FieldPacket } from "mysql2";

type PlayerRecordResults = [PlayerRecords[], FieldPacket[]];


export class PlayerRecords implements PlayerEntity {
  player_id: string;
  name: string;
  color: string;
  position: number;
  gold: number;
  level: number;
  magic_circle : number;
  experience: number;
  learning_points: string;
  strength: string;
  dexterity: string;
  mana : number;
  hitpoints: string;
  one_handed: string;
  two_handed: string;
  bow : number;
  crossbow : number;
  sneak: number;
  pick_locks: string;
  pickpocket: string;
  create_runes: string;
  alchemy : number;
  forge_weapons : number;
  take_trophies: number;

    constructor(obj: PlayerEntity) {
        this.player_id = obj.player_id;
        this.name = obj.name;
        this.color = obj.color;
        this.position = obj.position;
        this.gold = obj.gold;
        this.level = obj.level;
        this.magic_circle = obj.magic_circle;
        this.experience = obj.experience;
        this.learning_points = obj.learning_points;
        this.strength = obj.strength;
        this.dexterity = obj.dexterity;
        this.mana = obj.mana;
        this.hitpoints = obj.hitpoints;
        this.alchemy = obj.alchemy;
        this.one_handed = obj.one_handed;
        this.two_handed = obj.two_handed;
        this.bow = obj.bow;
        this.crossbow = obj.crossbow;
        this.sneak = obj.sneak;
        this.pick_locks = obj.pick_locks;
        this.pickpocket = obj.pickpocket;
        this.create_runes = obj.create_runes;
        this.alchemy = obj.alchemy;
        this.forge_weapons = obj.forge_weapons;
        this.take_trophies = obj.take_trophies;
      }

    static async listAll(player_id: string) {

        const [results] = await pool.execute("SELECT * FROM `player` WHERE `player_id` = :player_id", {
            player_id: player_id
        }) as PlayerRecordResults;

      return results.map(obj => new PlayerRecords(obj));
        }
    }
