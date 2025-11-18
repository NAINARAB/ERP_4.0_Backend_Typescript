import express from 'express';
import { requireAuth } from '../../controllers/configuration/login/requireAuth';
import userRoutes from './users';
import productRoutes from './products'
import unitRoutes from './units';
import packRoutes from './packs';
import brandRoutes from './brand';

const router = express.Router();

router.use('/users', requireAuth, userRoutes);
router.use('/products', requireAuth, productRoutes);
router.use('/units', requireAuth, unitRoutes);
router.use('/packs', requireAuth, packRoutes);
router.use('/brand', requireAuth, brandRoutes);

export default router;