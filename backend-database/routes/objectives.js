import express from 'express';
import mongoose from 'mongoose';
import { Objective } from '../database/models/Objective.js';
import { Map } from '../database/models/Map.js';

const router = express.Router();

// Get all objectives
router.get('/', async (req, res) => {
    try {
        const objectives = await Objective.find({});
        res.json(objectives);
    } catch (error) {
        res.send(error);
    }
})

// Get objectives by map id
router.get('/map/:id', async (req, res) => {
    try {
        const mapId = JSON.parse(req.params.id)

        Map
            .findOne({map_id: mapId})
            .populate('objectives')
            .then(map => {
                res.json(map.objectives);
            })
    } catch (error) {
        res.send(error);
    }
})

export default router;