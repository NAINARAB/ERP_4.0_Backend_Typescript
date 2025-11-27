import { Router } from 'express';
import {
    getAccountGroups,
    getAccountGroupById,
    createAccountGroup,
    updateAccountGroup,
    // deleteAccountGroup - if needed in future
} from '../../../controllers/masters/accounting/accountGroup.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["Group_Name", "Group_Alias_Name"]), getAccountGroups);
router.get('/:id', getAccountGroupById);
router.post('/', createAccountGroup);
router.put('/:id', updateAccountGroup);

export default router;
