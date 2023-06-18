import {Router} from "express";
import {Items} from "../records/item";

export const greenRouter = Router();

greenRouter

    .get('/', async (req, res) => {
        const items = await Items.getAll('green')
        res.json({
            items
        });
    })

  