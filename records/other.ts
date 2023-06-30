import {pool} from "../utils/db";
import { OtherEntity } from "../types";
import { FieldPacket } from "mysql2";

type OtherRecordResults = [OtherRecords[], FieldPacket[]];


export class OtherRecords implements OtherEntity {
    other_id: string;
    name: string;
    price: number;
    code: string;
    img: string;
    type: string;
    quantity : number;


    constructor(obj: OtherEntity) {
        this.name = obj.name;
        this.other_id = obj.other_id;
        this.price = obj.price;
        this.img = obj.img;
        this.code = obj.code;
        this.type = obj.type;
        this.quantity = obj.quantity;


    }

    static async listAll(player_id: string) {

        const [results] = await pool.execute(`
            SELECT other.*, hero_equipment.quantity
            FROM other
            JOIN hero_equipment ON other.other_id = hero_equipment.equipment_id
            WHERE hero_equipment.player_id = :player_id
            ORDER BY other.price DESC`, { 
                player_id: player_id
            }) as OtherRecordResults;

      return results.map(row => ({
        ...row,
        quantity: row.quantity
      }));
        
        }
}