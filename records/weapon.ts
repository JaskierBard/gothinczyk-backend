import {pool} from "../utils/db";
import { WeaponEntity } from "../types";
import { FieldPacket } from "mysql2";

type WeaponRecordResults = [WeaponRecords[], FieldPacket[]];


export class WeaponRecords implements WeaponEntity {
    weapon_id: string;
    name: string;
    cut_damage: number;
    hit_damage: number;
    strength: number;
    dexterity: number;
    price: number;
    img: string;
    code: string;
    type:string
    stack: boolean;

    constructor(obj: WeaponEntity) {
        this.name = obj.name;
        this.weapon_id = obj.weapon_id;
        this.cut_damage = obj.cut_damage;
        this.hit_damage = obj.hit_damage;
        this.strength = obj.strength;
        this.dexterity = obj.dexterity;
        this.price = obj.price;
        this.img = obj.img;
        this.code = obj.code;
        this.type = obj.type;
        this.stack = obj.stack;

    }

    static async listAll(): Promise<WeaponEntity[]> {
        const [resultsWeapon] = (await pool.execute("SELECT * FROM `weapon` ORDER BY type DESC, price DESC")) as WeaponRecordResults;
        return resultsWeapon.map(obj => new WeaponRecords(obj));
    }
   

   
}