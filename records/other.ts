import {pool} from "../utils/db";
import { OtherEntity } from "../types";
import { FieldPacket } from "mysql2";

type OtherRecordResults = [OtherRecords[], FieldPacket[]];


export class OtherRecords implements OtherEntity {
    id: string;
    name: string;
    price: number;
    code: string;
    img: string;

    constructor(obj: OtherEntity) {
        this.name = obj.name;
        this.id = obj.id;
        this.price = obj.price;
        this.img = obj.img;
        this.code = obj.code;
    }



    static async listAll(): Promise<OtherEntity[]> {
        const [resultsOther] = (await pool.execute("SELECT * FROM `other` ORDER BY `price` DESC")) as OtherRecordResults;
        return resultsOther.map(obj => new OtherRecords(obj));
    }
}