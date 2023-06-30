import {pool} from "../utils/db";
import { AlchemyEntity } from "../types";
import { FieldPacket } from "mysql2";

type AlchemyRecordResults = [AlchemyRecords[], FieldPacket[]];


export class AlchemyRecords implements AlchemyEntity {
    alchemy_id: string;
    name: string;
    type: number;
    description: number;
    price: number;
    alchemy: string;
    img: string;
    quantity : number;

    constructor(obj: AlchemyEntity) {
        this.alchemy_id = obj.alchemy_id;
        this.name = obj.name;
        this.type = obj.type;
        this.description = obj.description;
        this.price = obj.price;
        this.alchemy = obj.alchemy;
        this.img = obj.img;
        this.quantity = obj.quantity;

    }

    static async listAll(player_id: string) {

        const [results] = await pool.execute(`
            SELECT alchemy.*, hero_equipment.quantity
            FROM alchemy
            JOIN hero_equipment ON alchemy.alchemy_id = hero_equipment.equipment_id
            WHERE hero_equipment.player_id = :player_id
            ORDER BY alchemy.price DESC`, { 
                player_id: player_id
            }) as AlchemyRecordResults;

      return results.map(row => ({
        ...row,
        quantity: row.quantity
      }));
        }
    }
