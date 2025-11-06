import { requireAuth } from '../../controllers/configuration/login/requireAuth';
import appMenuRoutes from './appMenu';
import loginRoutes from './login';
import express from 'express';

const router = express.Router();

router.use('/appMenu', requireAuth, appMenuRoutes);
router.use('/login', loginRoutes);

export default router;