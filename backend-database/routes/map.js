import express from 'express';
import mongoose from 'mongoose';
import { Map } from '../database/models/Map.js';
import { Objective } from '../database/models/Objective.js';
import { createMapId } from '../utils/mapIdUtil.js';

const router = express.Router();

// Gets all maps
router.get('/', async (req, res) => {
    try {
        const maps = await Map.find({});
        res.json(maps);
    } catch (error) {
        res.send(error);
    }
})

// Get map by id
router.get('/:id', async (req, res) => {
    try {
        const mapId = JSON.parse(req.params.id)

        await Map.findOne({map_id: mapId}).then(map => {
            res.json(map);
        })
    } catch (error) {
        res.send(error);
    }
})

// Adds a new map and its objectives
router.post('/create', async (req, res) => {
    try {
        const objectivesDoc = await Objective.insertMany(req.body.objectives);

        const mapId = await createMapId();

        const newMap = new Map({
            map_id: mapId,
            name: req.body.name,
            objectives: objectivesDoc.map(doc => doc._id)
        });
        await newMap.save();

        res.json(mapId);
        // res.location(`/api/map/${newMap._id}`);
        // res.sendStatus(201);
    } catch (error) {
        res.send(error);
    }
})

export default router;