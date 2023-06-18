import {Router} from "express";
import {Items} from "../records/item";

export const redRouter = Router();

redRouter

    .get('/', async (req, res) => {
        const items = await Items.getAll('red')
        res.json({
            items
        });
    })

  