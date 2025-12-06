import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword
} from '../../../controllers/masters/users/users.controller';
import { paginationData } from '../../../middleware/pagination';

const router = Router();

router.get('/', paginationData(['name', 'uniqueName']), getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put("/:id/change-password", changePassword);

export default router;
