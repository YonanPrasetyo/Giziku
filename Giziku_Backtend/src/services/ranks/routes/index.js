import { Router } from 'express';
import {
  createRank,
  getRanks,
  getRankById,
  updateRankById,
  deleteRankById,
  getRankByXp
} from '../controller/rank-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { rankPayloadSchema } from '../validator/schema.js';
import { upload } from '../../../middlewares/upload.js';
import authenticateToken from '../../../middlewares/auth.js';
import authorizeRoles from '../../../middlewares/authorize.js';

const router = Router();

router.post('/ranks', authenticateToken, authorizeRoles('admin'), upload.single('icon'), validate(rankPayloadSchema), createRank);
router.get('/ranks', authenticateToken, authorizeRoles('admin'), getRanks);
router.get('/ranks/:id', authenticateToken, authorizeRoles('admin'), getRankById);
router.put('/ranks/:id', authenticateToken, authorizeRoles('admin'), upload.single('icon'), validate(rankPayloadSchema), updateRankById);
router.delete('/ranks/:id', authenticateToken, authorizeRoles('admin'), deleteRankById);

router.get('/rank/xp', authenticateToken, authorizeRoles('user'), getRankByXp);

export default router;
