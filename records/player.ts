import { pool } from "../utils/db";
import { PlayerEntity } from "../types";
import { FieldPacket } from "mysql2";

type PlayerRecordResults = [PlayerRecords[], FieldPacket[]];


export class PlayerRecords implements PlayerEntity {
  player_id: string;
  name: string;
  color: string;
  position: number;
  gold: number;
  level: number;
  magic_circle : number;
  experience: number;
  learning_points: string;
  strength: string;
  dexterity: string;
  mana : number;
  hitpoints: string;
  one_handed: string;
  two_handed: string;
  bow : number;
  crossbow : number;
  sneak: number;
  pick_locks: string;
  pickpocket: string;
  create_runes: string;
  alchemy : number;
  forge_weapons : number;
  take_trophies: number;

    constructor(obj: PlayerEntity) {
        this.player_id = obj.player_id;
        this.name = obj.name;
        this.color = obj.color;
        this.position = obj.position;
        this.gold = obj.gold;
        this.level = obj.level;
        this.magic_circle = obj.magic_circle;
        this.experience = obj.experience;
        this.learning_points = obj.learning_points;
        this.strength = obj.strength;
        this.dexterity = obj.dexterity;
        this.mana = obj.mana;
        this.hitpoints = obj.hitpoints;
        this.alchemy = obj.alchemy;
        this.one_handed = obj.one_handed;
        this.two_handed = obj.two_handed;
        this.bow = obj.bow;
        this.crossbow = obj.crossbow;
        this.sneak = obj.sneak;
        this.pick_locks = obj.pick_locks;
        this.pickpocket = obj.pickpocket;
        this.create_runes = obj.create_runes;
        this.alchemy = obj.alchemy;
        this.forge_weapons = obj.forge_weapons;
        this.take_trophies = obj.take_trophies;
      }

    static async listAll(player_id: string) {

        const [results] = await pool.execute("SELECT * FROM `player` WHERE `player_id` = :player_id", {
            player_id: player_id
        }) as PlayerRecordResults;

      return results.map(obj => new PlayerRecords(obj));
        }

        static async addExperience(player_id: string, experience:number): Promise<void> {

          await pool.execute("UPDATE `player` SET experience = experience +" + `${experience}` + " WHERE `player_id` = :player_id", {
              player_id: player_id
          })
  
          }

          static async updateLearningPoint(player_id: string, learningPoints: number, operation: string): Promise<void> {

            await pool.execute("UPDATE `player` SET learning_points = learning_points "+ `${operation}` + `${learningPoints}` + " WHERE `player_id` = :player_id", {
                player_id: player_id
            })
    
            }

            static async updateLvl(player_id: string, lvl: number): Promise<void> {

              await pool.execute("UPDATE `player` SET level = level +" + `${lvl}` + " WHERE `player_id` = :player_id", {
                  player_id: player_id
              })
      
              }
              static async resetStats(player_id: string): Promise<void> {

                await pool.execute("UPDATE player SET position = 0, gold = 2000, level = 0, magic_circle = 0, experience = 0, learning_points = 0, strength = 10, dexterity = 10, mana = 10, hitpoints = 100, one_handed = 0, two_handed = 0, bow = 0, crossbow = 0, sneak = 0, pick_locks = 0, pickpocket = 0, create_runes = 0, alchemy = 0, forge_weapons = 0, take_trophies = 0 WHERE `player_id` = :player_id", {
                    player_id: player_id
                })
        
                } 
                
                static async addAttribute(player_id: string, attribute:string, lp:number): Promise<void> {

                  await pool.execute("UPDATE `player` SET :attribute = :attribute + :lp   WHERE `player_id` = :player_id", {
                      player_id: player_id,
                      attribute,
                      lp
                  })
          
                  }         
    }
