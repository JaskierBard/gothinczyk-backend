import {pool} from "../utils/db";
import { ArmorEntity } from "../types";
import { FieldPacket } from "mysql2";

type ArmorRecordResults = [ArmorRecords[], FieldPacket[]];


export class ArmorRecords implements ArmorEntity {
    armor_id: string;
    name: string;
    def_weapon: number;
    def_bow: number;
    def_fire: number;
    def_magic: number;
    description: number;
    bonus: number;
    bonus_type: string;
    price: number;
    img: string;
    code: string;
    stack: boolean;
    type:string;
    quantity : number;


    constructor(obj: ArmorEntity) {
        this.name = obj.name;
        this.armor_id	 = obj.armor_id	;
        this.def_weapon = obj.def_weapon;
        this.def_bow = obj.def_bow;
        this.def_fire = obj.def_fire;
        this.def_magic = obj.def_magic;
        this.description = obj.description;
        this.bonus = obj.bonus;
        this.bonus_type = obj.bonus_type;
        this.price = obj.price;
        this.img = obj.img;
        this.code = obj.code;
        this.stack = obj.stack;
        this.type = obj.type;
        this.quantity = obj.quantity;

    }

    static async listAll(player_id: string) {

        const [results] = await pool.execute(`
            SELECT armor.*, hero_equipment.quantity
            FROM armor
            JOIN hero_equipment ON armor.armor_id = hero_equipment.equipment_id
            WHERE hero_equipment.player_id = :player_id
            ORDER BY armor.price DESC`, { 
                player_id: player_id
            }) as ArmorRecordResults;

      return results.map(row => ({
        ...row,
        quantity: row.quantity
      }));
        
        }
   

   
}