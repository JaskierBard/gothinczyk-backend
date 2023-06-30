import {Router} from "express";
import { ArmorRecords } from "../records/armor";
import { WeaponRecords } from "../records/weapon";
import { AlchemyRecords } from "../records/alchemy";
import { MagicRecords } from "../records/magic";
import { OtherRecords } from "../records/other";
import { PlayerRecords } from "../records/player";

export const playerRouter = Router();

playerRouter
    .get('/equipment/', async (req, res) => {
        const player_id = '21bdf586-1588-11ee-9005-581122ba8110';
        // const pagin = req.query.pagination;
        // const value = Number(pagin)
        
        const weapon = await WeaponRecords.listAll(player_id);
        const armor = await ArmorRecords.listAll(player_id)
        const alchemy = await AlchemyRecords.listAll(player_id)
        const magic = await MagicRecords.listAll(player_id)
        const other = await OtherRecords.listAll(player_id)

        res.json({
            weapon,
            armor,
            alchemy,
            magic,
            other           
        })

        
    })

    .get('/statistic/', async (req, res) => {
        const player_id = '21bdf586-1588-11ee-9005-581122ba8110';

        const statistic = await PlayerRecords.listAll(player_id);
        console.log(statistic)
        res.json({
            statistic           
        })
    })