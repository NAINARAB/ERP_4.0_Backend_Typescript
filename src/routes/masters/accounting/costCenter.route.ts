import { Router } from 'express';
import {
    getCostCenters,
    getCostCenterById,
    createCostCenter,
    updateCostCenter,
    // deleteCostCenter - if needed in future
} from '../../../controllers/masters/accounting/costCenter.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Cost_Center", "Cost_Alias_name"]), getCostCenters);
router.get('/:id', getCostCenterById);
router.post('/', createCostCenter);
router.put('/:id', updateCostCenter);

export default router;
