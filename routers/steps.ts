import {Router} from "express";
import { readFile } from "fs/promises";
import { StepRecord } from "../records/step";
import { blue, green, red, yellow } from "../utils/numberTranslator";

export const stepRouter = Router();

stepRouter

    .get('/', async (req, res) => {
        const payload = JSON.parse(await readFile(`./data/heroes.json`, 'utf-8'))
        // console.log({payload})
        res.json({
            payload,
        })
    })

    .post('/', async (req, res) => {
        const newStep = req.body
        const step = await StepRecord.getAll()
        console.log(StepRecord.update(newStep, step, blue, green, yellow, red))

        res.json('hej')
    })

   