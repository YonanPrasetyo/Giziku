import { Router } from 'express';
import {
  getProfileMissionsBatch,
  getUserMissionBatch,
  completeMissionBatch
} from '../controller/user-mission-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import authorizeRoles from '../../../middlewares/authorize.js';
import { upload } from '../../../middlewares/upload.js';

const router = Router();

router.get('/user-missions', authenticateToken, authorizeRoles('user'), getUserMissionBatch);
router.get('/user-missions/profiles/:profileId', authenticateToken, authorizeRoles('user'), getProfileMissionsBatch);
router.post('/user-missions/profiles/complete/:profileId', authenticateToken, authorizeRoles('user'), upload.single('file'), completeMissionBatch);

export default router;
