import express from 'express';
import objectives from './objectives.js';
import maps from './map.js';
import drive from './drive.js';

const router = express.Router();

router.use('/maps', maps)
router.use('/objectives', objectives);
router.use('/drive', drive);

export default router;