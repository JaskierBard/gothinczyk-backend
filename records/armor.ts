import {pool} from "../utils/db";
import { ArmorEntity } from "../types";
import { FieldPacket } from "mysql2";

type ArmorRecordResults = [ArmorRecords[], FieldPacket[]];


export class ArmorRecords implements ArmorEntity {
    armor_id	: string;
    name: string;
    def_weapon: number;
    def_bow: number;
    def_fire: number;
    def_magic: number;
    price: number;
    img: string;
    code: string;
    stack: boolean;
    type:string

    constructor(obj: ArmorEntity) {
        this.name = obj.name;
        this.armor_id	 = obj.armor_id	;
        this.def_weapon = obj.def_weapon;
        this.def_bow = obj.def_bow;
        this.def_fire = obj.def_fire;
        this.def_magic = obj.def_magic;
        this.price = obj.price;
        this.img = obj.img;
        this.code = obj.code;
        this.stack = obj.stack;
        this.type = obj.type;
    }

    static async listAll(): Promise<ArmorEntity[]> {
        const [resultsArmor] = (await pool.execute("SELECT * FROM `armor` ORDER BY `name` DESC")) as ArmorRecordResults;
        return resultsArmor.map(obj => new ArmorRecords(obj));
    }
   

   
}