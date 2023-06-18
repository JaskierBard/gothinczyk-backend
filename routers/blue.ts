import {Router} from "express";
import {Items} from "../records/item";

export const blueRouter = Router();

blueRouter

    .get('/', async (req, res) => {
        const items = await Items.getAll('blue')
        res.json({
            items
        });
    })