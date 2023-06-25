import {pool} from "../utils/db";
import { MagicEntity } from "../types";
import { FieldPacket } from "mysql2";

type MagicRecordResults = [MagicRecords[], FieldPacket[]];


export class MagicRecords implements MagicEntity {
    id: string;
    name: string;
    type: number;
    mana_needed: number;
    description: number;
    damage: number;
    price: number;
    code: string;
    img: string;

    constructor(obj: MagicEntity) {
        this.name = obj.name;
        this.id = obj.id;
        this.type = obj.type;
        this.mana_needed = obj.mana_needed;
        this.description = obj.description;
        this.damage = obj.damage;
        this.price = obj.price;
        this.img = obj.img;
        this.code = obj.code;

    }



    static async listAll(): Promise<MagicEntity[]> {
        const [resultsMagic] = (await pool.execute("SELECT * FROM `magic` ORDER BY `price` DESC")) as MagicRecordResults;
        return resultsMagic.map(obj => new MagicRecords(obj));
    }
   

   
}