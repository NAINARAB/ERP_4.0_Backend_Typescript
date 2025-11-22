import express from 'express';
import {
    createPack,
    getPacks,
    getPackById,
    updatePack,
    deletePack
} from '../../controllers/masters/packs.controller';
import { paginationData } from '../../middleware/pagination';

const router = express.Router();

router.post('/', createPack);
router.get('/', paginationData(['Pack']), getPacks);
router.get('/:id', getPackById);
router.put('/:id', updatePack);
router.delete('/:id', deletePack);

export default router;
