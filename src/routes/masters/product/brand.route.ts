import { Router } from 'express';
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand
} from '../../../controllers/masters/product/brand.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Brand_Name", "Brand_Description"]), getBrands);
router.get('/:id', getBrandById);
router.post('/', createBrand);
router.put('/:id', updateBrand);

export default router;
