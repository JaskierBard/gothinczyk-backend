import {readFile } from "fs/promises";
import { ArmorEntity } from "../types";



export class Items implements ArmorEntity {
    id: string;
    name: string;
    defense: number;
    price: number;
    image: string;

    constructor(obj: ArmorEntity) {
        this.name = obj.name;
        this.id = obj.id;
        this.defense = obj.defense;
        this.price = obj.price;
        this.image = obj.image;
    }



    static async getAll(player:string): Promise<Items[]> {
        const data = JSON.parse(await readFile(`./data/equipment/${player}.json`, 'utf-8'));
        // const blue = data[`${player}`]
        // const eq = blue['equipment']
        // const library:string[] = []
        
        // const [results] = eq
        // results.forEach((element: any) => {
        //     let zmien = element
        //     library.push(zmien)
        // });
        // console.log(library)
        // console.log(data)
       

        return data
     }
   

   
}