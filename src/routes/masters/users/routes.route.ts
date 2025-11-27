import { Router } from 'express';
import {
    getRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute
} from '../../../controllers/masters/users/route.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Route_Name"]), getRoutes);
router.get('/:id', getRouteById);
router.post('/', createRoute);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

export default router;
