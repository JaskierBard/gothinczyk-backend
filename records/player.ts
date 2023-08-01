import { pool } from "../utils/db";
import { PlayerEntity } from "../types";
import { FieldPacket, RowDataPacket } from "mysql2";
import { v4 as uuid } from 'uuid';


type PlayerRecordResults = [PlayerRecords[], FieldPacket[]];

export class PlayerRecords implements PlayerEntity {
  player_id: string;
  name: string;
  color: string;
  position: number;
  level: number;
  magic_circle: number;
  experience: number;
  learning_points: string;
  strength: string;
  dexterity: string;
  mana: number;
  max_mana: number;
  hitpoints: number;
  max_hitpoints: number;
  one_handed: string;
  two_handed: string;
  bow: number;
  crossbow: number;
  sneak: number;
  pick_locks: string;
  pickpocket: string;
  create_runes: string;
  alchemy: number;
  forge_weapons: number;
  take_trophies: number;

  constructor(obj: PlayerEntity) {
    this.player_id = obj.player_id;
    this.name = obj.name;
    this.color = obj.color;
    this.position = obj.position;
    this.level = obj.level;
    this.magic_circle = obj.magic_circle;
    this.experience = obj.experience;
    this.learning_points = obj.learning_points;
    this.strength = obj.strength;
    this.dexterity = obj.dexterity;
    this.mana = obj.mana;
    this.max_mana = obj.max_mana;
    this.hitpoints = obj.hitpoints;
    this.max_hitpoints = obj.max_hitpoints;
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
    const [results] = (await pool.execute(
      "SELECT * FROM `player` WHERE `player_id` = :player_id",
      {
        player_id: player_id,
      }
    )) as PlayerRecordResults;

    return results.map((obj) => new PlayerRecords(obj));
  }

  static async addExperience(
    player_id: string,
    experience: number
  ): Promise<void> {
    await pool.execute(
      "UPDATE `player` SET experience = experience +" +
        `${experience}` +
        " WHERE `player_id` = :player_id",
      {
        player_id: player_id,
      }
    );
  }

  static async updateLearningPoint(
    player_id: string,
    learningPoints: number,
    operation: string
  ): Promise<void> {
    await pool.execute(
      "UPDATE `player` SET learning_points = learning_points " +
        `${operation}` +
        `${learningPoints}` +
        " WHERE `player_id` = :player_id",
      {
        player_id: player_id,
      }
    );
  }

  static async updateLvl(player_id: string, lvl: number): Promise<void> {
    console.log(lvl + ' lvl')
    await pool.execute(
      "UPDATE `player` SET level = level +" +
        `${lvl}` +
        " WHERE `player_id` = :player_id",
      {
        player_id: player_id,
      }
    );
  }
  static async resetStats(player_id: string): Promise<void> {
    await pool.execute(
      "UPDATE player SET position = 0, gold = 2000, level = 0, magic_circle = 0, experience = 0, learning_points = 0, strength = 10, dexterity = 10, mana = 10, hitpoints = 100, one_handed = 0, two_handed = 0, bow = 0, crossbow = 0, sneak = 0, pick_locks = 0, pickpocket = 0, create_runes = 0, alchemy = 0, forge_weapons = 0, take_trophies = 0 WHERE `player_id` = :player_id",
      {
        player_id: player_id,
      }
    );
  }

  static async addAttribute(
    player_id: string,
    attribute: string,
    lp: number
  ): Promise<void> {
    await pool.execute(
      `UPDATE player SET ${attribute} = ${attribute} + :lp,  learning_points = learning_points - :lp WHERE player_id = :player_id`,
      {
        player_id: player_id,
        attribute: attribute,
        lp: lp,
      }
    );
  }
  static async buyProduct(buyerId: string, sellerId:string, productPrice: number, itemId: string, type: string) {
    const id: string = uuid();

    const payQuery = `UPDATE hero_equipment SET quantity = quantity -:productPrice WHERE equipment_id = :gold AND player_id = :buyerId`
    const earnQuery = `UPDATE hero_equipment SET quantity = quantity +:productPrice WHERE equipment_id = :gold AND player_id = :sellerId`
    const createProductQuery = `INSERT INTO hero_equipment (id, equipment_id, player_id, quantity) VALUES (:id, :itemId, :player_id, :quantity)`
    const addProductQuery = `UPDATE hero_equipment SET quantity = quantity +1 WHERE equipment_id = :itemId AND player_id = :player_id`
   const removeProductQuery = `DELETE FROM hero_equipment WHERE equipment_id = :itemId AND player_id = :player_id`
   const subtractProductQuery = `UPDATE hero_equipment SET quantity = quantity -1 WHERE equipment_id = :itemId AND player_id = :player_id`
    const pay = {
      
        productPrice: productPrice,
        gold :'d6d6d0db-2724-11ee-9b0b-581122ba8110',
        buyerId: buyerId
      
    };
    const earn = {
      
        productPrice: productPrice,
        gold :'d6d6d0db-2724-11ee-9b0b-581122ba8110',
        sellerId: sellerId
      
    }
    const createProduct = {
      
        id: id,
      itemId: itemId,
      player_id: buyerId,
      quantity: 1
      
    };

    const addProduct = {
      
        itemId: itemId,
        player_id: buyerId
      
    };

    const removeProduct = {
      
        itemId: itemId,
      player_id: sellerId,
      
    };

    const subtractProduct = {
      
        itemId: itemId,
      player_id: sellerId
      
    };



     

    

    

    const [SellerResult] = await pool.execute(`SELECT * FROM hero_equipment WHERE equipment_id = :itemId AND player_id = :player_id`, {
      player_id: sellerId,
      itemId: itemId,
    }) as RowDataPacket[]

    const [BuyerResult] = await pool.execute(`SELECT * FROM hero_equipment WHERE equipment_id = :itemId AND player_id = :player_id`, {
      player_id: buyerId,
      itemId: itemId,
    }) as RowDataPacket[]

    if (BuyerResult.length === 0) {
     console.log(BuyerResult.length + ' buyer')
     await pool.execute(payQuery, pay)
      console.log('pay1')

      await pool.execute(earnQuery, earn)

      console.log('earn1')

      await pool.execute(createProductQuery, createProduct)

      console.log('utworzono miecz do ' + buyerId);

      if (SellerResult[0].quantity <= 1) {
        console.log('SellerResult[0].quantity1 ' + SellerResult[0].quantity)

        await pool.execute(removeProductQuery, removeProduct)

        console.log('remove1')

      } else {
        await pool.execute(subtractProductQuery, subtractProduct)

        console.log('subtractProduct1')

      }
    } else {
      await pool.execute(payQuery, pay)

      console.log('pay2')

      await pool.execute(earnQuery, earn)

      console.log('earn2')

      await pool.execute(addProductQuery, addProduct)

      console.log('dodano miecz do' + buyerId);

      if (SellerResult[0].quantity <= 1) {
        console.log('SellerResult[0].quantity2 ' + SellerResult[0].quantity)

        await pool.execute(removeProductQuery, removeProduct)

        console.log('remove2' )

      } else {
        await pool.execute(subtractProductQuery, subtractProduct)

        console.log('subtractProduct2')

      }
    }

return SellerResult[0].quantity
    // przenieść zapytania do zmiennych i robić tylko pool execute @@@

  }
}
