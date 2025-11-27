import { Router } from 'express';
import {
    getAllAreas,
    getAreaById,
    createArea,
    updateArea,
    deleteArea
} from '../../../controllers/masters/users/area.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Area_Name"]), getAllAreas);
router.get('/:id', getAreaById);
router.post('/', createArea);
router.put('/:id', updateArea);
router.delete('/:id', deleteArea);

export default router;
