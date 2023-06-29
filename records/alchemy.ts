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

    constructor(obj: AlchemyEntity) {
        this.alchemy_id = obj.alchemy_id;
        this.name = obj.name;
        this.type = obj.type;
        this.description = obj.description;
        this.price = obj.price;
        this.alchemy = obj.alchemy;
        this.img = obj.img;
    }

    static async listAll(): Promise<AlchemyEntity[]> {
        const [resultsAlchemy] = (await pool.execute("SELECT * FROM `alchemy` ORDER BY `name` DESC")) as AlchemyRecordResults;
        return resultsAlchemy.map(obj => new AlchemyRecords(obj));
    }
}