import express from 'express';
import configurationRoutes from './configuration/index';
import mastersRoutes from './masters';


const router = express.Router();

router.use('/configuration', configurationRoutes);
router.use('/masters', mastersRoutes);

export default router;