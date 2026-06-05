import { Router } from 'express';
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
} from '../controller/profile-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { profilePayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.post('/profiles', authenticateToken, validate(profilePayloadSchema), createProfile);
router.get('/profiles', authenticateToken, getProfiles);
router.get('/profiles/:id', authenticateToken, getProfileById);
router.put('/profiles/:id', authenticateToken, validate(profilePayloadSchema), updateProfileById);
router.delete('/profiles/:id', authenticateToken, deleteProfileById);

export default router;
