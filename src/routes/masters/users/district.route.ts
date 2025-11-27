import { Router } from 'express';
import {
    getDistrict,
    getDistrictById,
    createDistrict,
    updateDistrict,
    deleteDistrict
} from '../../../controllers/masters/users/district.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["District_Name"]), getDistrict);
router.get('/:id', getDistrictById);
router.post('/', createDistrict);
router.put('/:id', updateDistrict);
router.delete('/:id', deleteDistrict);

export default router;
