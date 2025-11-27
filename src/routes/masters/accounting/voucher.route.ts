import { Router } from 'express';
import {
    getVouchers,
    getVoucherById,
    createVoucher,
    updateVoucher,
    // deleteVoucher - if needed in future
} from '../../../controllers/masters/accounting/voucher.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Voucher_Type", "Voucher_Code"]), getVouchers);
router.get('/:id', getVoucherById);
router.post('/', createVoucher);
router.put('/:id', updateVoucher);

export default router;
