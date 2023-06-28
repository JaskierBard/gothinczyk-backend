import {Router} from "express";
import { ArmorRecords } from "../records/armor";
import { WeaponRecords } from "../records/weapon";
import { AlchemyRecords } from "../records/alchemy";
import { MagicRecords } from "../records/magic";
import { OtherRecords } from "../records/other";

export const playerRouter = Router();

playerRouter
    .get('/equipment/', async (req, res) => {
        const pagin = req.query.pagination;
        const value = Number(pagin)
        
        const weapon = await WeaponRecords.listAll();
        const armor = await ArmorRecords.listAll()
        const alchemy = await AlchemyRecords.listAll()
        const magic = await MagicRecords.listAll()
        const other = await OtherRecords.listAll()

        res.json({
            weapon,
            armor,
            alchemy,
            magic,
            other           
        })
    })