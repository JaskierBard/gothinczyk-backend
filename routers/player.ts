import {Router} from "express";
import { ArmorRecords } from "../records/armor";
import { WeaponRecords } from "../records/weapon";

export const playerRouter = Router();

playerRouter

    .get('/equipment', async (req, res) => {
        const weapons = await WeaponRecords.listAll()
        const armors = await ArmorRecords.listAll()
        res.json({
            weapons,
            armors
        })
    })