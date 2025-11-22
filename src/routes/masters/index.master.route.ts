import express from 'express';

import userRoutes from './users.route';
import accoutRoutes from './accounts.route';

import productGroupRoutes from './productGroup.route';
import brandRoutes from './brand.route';
import packRoutes from './packs.route';
import unitRoutes from './units.route';
import productRoutes from './products.route';

import areaRoutes from './area.route';
import districtRoutes from './district.route';
import stateRoutes from './state.route';
import routeRoutes from './routes.route';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/accounts', accoutRoutes);

router.use('/productGroup', productGroupRoutes);
router.use('/brand', brandRoutes);
router.use('/packs', packRoutes);
router.use('/units', unitRoutes);
router.use('/products', productRoutes);

router.use('/area', areaRoutes);
router.use('/district', districtRoutes);
router.use('/state', stateRoutes);
router.use('/route', routeRoutes);

export default router;