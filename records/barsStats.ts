import {pool} from "../utils/db";
import { BarsEntity } from "../types";
import { FieldPacket } from "mysql2";

type BarStatsResults = [BarsStatsRecords[], FieldPacket[]];


export class BarsStatsRecords implements BarsEntity {
    id: string;
    hitpoints: number;
    max_hitpoints: number;
    mana: number;
    max_mana:number;
    stamina: number;
    max_stamina:number;


    constructor(obj: BarsEntity) {
        this.id = obj.id;
        this.hitpoints = obj.hitpoints;
        this.max_hitpoints = obj.max_hitpoints;
        this.mana = obj.mana;
        this.max_mana = obj.max_mana;
        this.stamina = obj.stamina;
        this.max_stamina = obj.max_hitpoints;
    }

    static async getBarsStats(id: string) {

        const [results] = await pool.execute(`
            SELECT other.*, hero_equipment.quantity
            FROM other
            JOIN hero_equipment ON other.other_id = hero_equipment.equipment_id
            WHERE hero_equipment.player_id = :player_id
            ORDER BY other.price DESC`, { 
                id: id
            }) as BarStatsResults;

      return results.map(row => ({
        ...row,
        // quantity: row.quantity
      }));

      
        
        }

        static async getGold(player_id: string) {

            
          }
}