import {Router} from "express";
import {Items} from "../records/item";

export const yellowRouter = Router();

yellowRouter

    .get('/', async (req, res) => {
        const items = await Items.getAll('yellow')
        res.json({
            items
        });
    })
