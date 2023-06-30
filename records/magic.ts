import {pool} from "../utils/db";
import { MagicEntity } from "../types";
import { FieldPacket } from "mysql2";

type MagicRecordResults = [MagicRecords[], FieldPacket[]];


export class MagicRecords implements MagicEntity {
    magic_id: string;
    name: string;
    type: number;
    mana_needed: number;
    description: number;
    damage: number;
    price: number;
    code: string;
    img: string;
    quantity : number;


    constructor(obj: MagicEntity) {
        this.name = obj.name;
        this.magic_id = obj.magic_id;
        this.type = obj.type;
        this.mana_needed = obj.mana_needed;
        this.description = obj.description;
        this.damage = obj.damage;
        this.price = obj.price;
        this.img = obj.img;
        this.code = obj.code;
        this.quantity = obj.quantity;


    }

    static async listAll(player_id: string) {

        const [results] = await pool.execute(`
            SELECT magic.*, hero_equipment.quantity
            FROM magic
            JOIN hero_equipment ON magic.magic_id = hero_equipment.equipment_id
            WHERE hero_equipment.player_id = :player_id
            ORDER BY magic.price DESC`, { 
                player_id: player_id
            }) as MagicRecordResults;

      return results.map(row => ({
        ...row,
        quantity: row.quantity
      }));
        
        }
   

   
}