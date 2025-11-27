import { Router } from 'express';
import {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    // deleteAccount - if needed in future
} from '../../../controllers/masters/accounting/accountMaster.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Account_name", "Account_Alias_name"]), getAccounts);
router.get('/:id', getAccountById);
router.post('/', createAccount);
router.put('/:id', updateAccount);

export default router;
