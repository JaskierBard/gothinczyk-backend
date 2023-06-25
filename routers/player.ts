import {Router} from "express";
import { ArmorRecords } from "../records/armor";
import { WeaponRecords } from "../records/weapon";
import { AlchemyRecords } from "../records/alchemy";
import { MagicRecords } from "../records/magic";
import { OtherRecords } from "../records/other";

export const playerRouter = Router();

playerRouter

    .get('/equipment', async (req, res) => {
        const weapons = await WeaponRecords.listAll()
        const armors = await ArmorRecords.listAll()
        const alchemy = await AlchemyRecords.listAll()
        const magic = await MagicRecords.listAll()
        const other = await OtherRecords.listAll()


        res.json({
            weapons,
            armors,
            alchemy,
            magic,
            other
        })
    })