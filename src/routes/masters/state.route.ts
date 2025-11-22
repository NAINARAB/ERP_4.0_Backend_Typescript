import { Router } from 'express';
import {
    getState,
    getStateById,
    createState,
    updateState,
    deleteState
} from '../../controllers/masters/state.controller';
import { paginationData } from '../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["State_Name"]), getState);
router.get('/:id', getStateById);
router.post('/', createState);
router.put('/:id', updateState);
router.delete('/:id', deleteState);

export default router;
