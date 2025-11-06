import { Router } from 'express';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  softDeleteUser
} from '../../controllers/masters/users';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', softDeleteUser);

export default router;
