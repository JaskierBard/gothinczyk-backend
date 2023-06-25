import {Router} from "express";
import { ArmorRecords } from "../records/armor";
import { WeaponRecords } from "../records/weapon";
import { AlchemyRecords } from "../records/alchemy";

export const playerRouter = Router();

playerRouter

    .get('/equipment', async (req, res) => {
        const weapons = await WeaponRecords.listAll()
        const armors = await ArmorRecords.listAll()
        const alchemy = await AlchemyRecords.listAll()

        res.json({
            weapons,
            armors,
            alchemy
        })
    })