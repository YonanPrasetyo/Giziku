import { Router } from 'express';
import {
  getStreakByUserId,
} from '../controller/streaks-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import authorizeRoles from '../../../middlewares/authorize.js';

const router = Router();

router.get('/streaks', authenticateToken, authorizeRoles(['user']), getStreakByUserId);

export default router;