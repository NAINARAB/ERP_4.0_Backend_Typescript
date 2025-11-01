import configurationRoutes from './configuration/index';
import express from 'express';

const router = express.Router();

router.use('/configuration', configurationRoutes);

export default router;