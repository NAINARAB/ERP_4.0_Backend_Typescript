import appMenuRoutes from './appMenu';
import loginRoutes from './login';
import express from 'express';

const router = express.Router();

router.use('/appMenu', appMenuRoutes);
router.use('/login', loginRoutes);

export default router;