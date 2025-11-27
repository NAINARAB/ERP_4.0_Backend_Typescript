import { Router } from 'express';
import {
    getCostCategories,
    getCostCategoryById,
    createCostCategory,
    updateCostCategory,
    // deleteCostCategory - if needed in future
} from '../../../controllers/masters/accounting/costCategory.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Cost_Category", "Category_Alias_name"]), getCostCategories);
router.get('/:id', getCostCategoryById);
router.post('/', createCostCategory);
router.put('/:id', updateCostCategory);

export default router;
