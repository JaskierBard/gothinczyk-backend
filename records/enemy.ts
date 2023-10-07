import {pool} from "../utils/db";
import { MagicEntity } from "../types";
import { FieldPacket } from "mysql2";

type EnemyRecordResults = [EnemyRecords[], FieldPacket[]];


export class EnemyRecords implements EnemyRecords {
    enemy_id:string;
    name:string;
    experience:number;
    strength:number;
    dexterity:number;
    health_points:number;
    def_weapon:number;
    def_bow:number;
    def_fire:number;
    def_magic:number;
    rarity:number;
    img:string;
    code:string;



    constructor(obj: EnemyRecords) {
        this.enemy_id = obj.enemy_id;
        this.name = obj.name;
        this.experience = obj.experience;
        this.strength = obj.strength;
        this.dexterity = obj.dexterity;
        this.health_points = obj.health_points;
        this.def_weapon = obj.def_weapon;
        this.def_bow = obj.def_bow;
        this.def_fire = obj.def_fire;
        this.def_magic = obj.def_magic;
        this.rarity = obj.rarity;
        this.img = obj.img;
        this.code = obj.code;



    }

    static async getEnemy(enemy_id:string ) {
        const [result] = await pool.execute(`
        SELECT * FROM enemy WHERE enemy_id = :enemy_id
        `, { 
            enemy_id: enemy_id
        }) as EnemyRecordResults;
        console.log(result)
    return result;
    }

    static async getRandomEnemy() {
        const [result] = await pool.execute(`
        SELECT * FROM enemy ORDER BY RAND() LIMIT 1`
        ) as EnemyRecordResults;
    return result;
    }
    
}