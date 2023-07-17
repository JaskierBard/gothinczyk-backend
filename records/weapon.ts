import {pool} from "../utils/db";
import { WeaponEntity } from "../types";
import { FieldPacket } from "mysql2";

type WeaponRecordResults = [WeaponRecords[], FieldPacket[]];

const BosperWeapon:string[] = ['Kiepski miecz', 'Długi łuk', 'Łuk dębowy', 'Łuk jesionowy', 'Smoczy łuk', 'Laga', 'Strzała', 'Bełt', 'Ciężka pałka z kolcami']


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
    quantity : number;


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
        this.quantity = obj.quantity;


    }

    static async listAll(player_id: string) {

        const [results] = await pool.execute(`
            SELECT weapon.*, hero_equipment.quantity
            FROM weapon
            JOIN hero_equipment ON weapon.weapon_id = hero_equipment.equipment_id
            WHERE hero_equipment.player_id = :player_id
            ORDER BY weapon.price DESC`, { 
                player_id: player_id
            }) as WeaponRecordResults;

      return results.map(row => ({
        ...row,
        quantity: row.quantity
      }));
        }

        static async listMerchantGoods() {
            const results: any[] = [];

            for (const weapon of BosperWeapon) {
              const selectQuery = 'SELECT * FROM weapon WHERE name = ?';
              const [rows] = await pool.execute<any>(selectQuery, [weapon]);
          
              if (rows.length > 0) {
                results.push(rows[0]);
              }
            }
          
            return results;
            
            }
       
   

   
}