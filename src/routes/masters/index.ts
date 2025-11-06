import express from 'express';
import { requireAuth } from '../../controllers/configuration/login/requireAuth';
import userRoutes from './users'

const router = express.Router();

router.use('/users', requireAuth, userRoutes);

export default router;