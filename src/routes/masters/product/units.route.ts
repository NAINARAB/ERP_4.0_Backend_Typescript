import express from 'express';
import { createUnit, getUnits, getUnitById, updateUnit, deleteUnit } from '../../../controllers/masters/product/units.controller';
import { paginationData } from "../../../middleware/pagination";

const router = express.Router();

router.post('/', paginationData(['Units']), createUnit);
router.get('/', getUnits);
router.get('/:id', getUnitById);
router.put('/:id', updateUnit);
router.delete('/:id', deleteUnit);

export default router;
