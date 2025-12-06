import { Router } from 'express';
import {
  getGodowns,
  getGodownById,
  createGodown,
  updateGodown,
//   deleteGodown
} from '../../../controllers/masters/product/godown.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Godown_Name"]), getGodowns);
router.get('/:id', getGodownById);
router.post('/', createGodown);
router.put('/:id', updateGodown);
// router.delete('/:id', deleteGodown);

export default router;
