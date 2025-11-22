import express from 'express';
import {
    getProductGroups,
    getProductGroupById,
    createProductGroup,
    updateProductGroup,
    deleteProductGroup
} from '../../controllers/masters/productGroup.controller';
import { paginationData } from '../../middleware/pagination';

const router = express.Router();

router.get('/', paginationData(['Pro_Group']), getProductGroups);
router.get('/:id', getProductGroupById);
router.post('/', createProductGroup);
router.put('/:id', updateProductGroup);
router.delete('/:id', deleteProductGroup);

export default router;
