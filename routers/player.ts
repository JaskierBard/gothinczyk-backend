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
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';
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

    .get('/merchant_goods/', async (req, res) => {
    
        
        const weapon = await WeaponRecords.listMerchantGoods();
        // console.log(weapon)

        res.json({
            weapon,          
        })

        
    })

    

    .get('/statistic/', async (req, res) => {
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';

        const statistic = await PlayerRecords.listAll(player_id);
        // console.log(statistic)
        res.json({
            statistic           
        })

        
    })
    .get('/statistic/reset/', async (req, res) => {
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';
        await PlayerRecords.resetStats(player_id);
        res.json({
            player_id 
         })
    })

    .post('/statistic/update_lvl/:lvl', async (req, res) => {
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';
        const lvl = req.params.lvl
        await PlayerRecords.updateLvl(player_id, Number(lvl))
        // console.log(lvl)
        res.json({
            lvl 
         })
    })

    .post('/statistic/learning_points/:operation/:learningPoints', async (req, res) => {
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';
        const lp = req.params.learningPoints
        const operation = req.params.operation

        await PlayerRecords.updateLearningPoint(player_id, Number(lp), operation)
        res.json({
            lp 
         })
    })

    .post('/statistic/experience/:exp', async (req, res) => {
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';

        const exp = req.params.exp
        await PlayerRecords.addExperience(player_id, Number(exp))
        res.json({
           exp 
        })
    })

    .post('/statistic/add_attributes/:attribute/:learningPoints', async (req, res) => {
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';
        const attribute = req.params.attribute
        const lp = req.params.learningPoints

        await PlayerRecords.addAttribute(player_id,attribute, Number(lp))
        res.json({
           player_id 
        })
    })

    .post('/buy/:productPrice/:itemId/:type', async (req, res) => {
        const player_id = '865055da-1b49-11ee-af61-581122ba8110';
        const productPrice = req.params.productPrice
        const itemId = req.params.itemId
        const type = req.params.type
        // console.log('przed')

        await PlayerRecords.buyProduct(player_id,Number(productPrice), itemId, type)
        res.json({
           
        })
    })