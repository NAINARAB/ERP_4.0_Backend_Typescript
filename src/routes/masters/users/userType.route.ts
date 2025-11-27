import { Router } from 'express';
import {
    getAllUserTypes,
    getUserTypeById,
    createUserType,
    updateUserType,
    deleteUserType
} from '../../../controllers/masters/users/userType.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(["UserType"]), getAllUserTypes);
router.get('/:id', getUserTypeById);
router.post('/', createUserType);
router.put('/:id', updateUserType);
router.delete('/:id', deleteUserType);

export default router;
