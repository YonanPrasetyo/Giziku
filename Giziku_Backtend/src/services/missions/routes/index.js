import { Router } from 'express';
import {
  createMission,
  getMissions,
  getMissionById,
  updateMissionById,
  deleteMissionById,
} from '../controller/mission-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { missionPayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import authorizeRoles from '../../../middlewares/authorize.js';

const router = Router();

router.post('/missions', authenticateToken, authorizeRoles('admin'), validate(missionPayloadSchema), createMission);
router.get('/missions', authenticateToken, authorizeRoles('admin'), getMissions);
router.get('/missions/:id', authenticateToken, authorizeRoles('admin'), getMissionById);
router.put('/missions/:id', authenticateToken, authorizeRoles('admin'), validate(missionPayloadSchema), updateMissionById);
router.delete('/missions/:id', authenticateToken, authorizeRoles('admin'), deleteMissionById);

export default router;
