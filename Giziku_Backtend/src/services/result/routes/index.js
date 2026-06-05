import { Router } from 'express';
import {
  createResult,
  createResultByFoodName,
  getResultById,
  getAllResults,
  getResultsByProfileId,
  getThreeLatestResultsByProfileId,
  getTotalNutritionTodayByProfileId,
} from '../controller/result-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import { upload } from '../../../middlewares/upload.js';
import { resultPayloadSchema, directResultPayloadSchema } from '../validator/schema.js';
import { validate } from '../../../middlewares/validate.js';

const router = Router();

router.post('/results', authenticateToken, upload.single('file'), validate(resultPayloadSchema), createResult);
router.post('/results/direct', authenticateToken, validate(directResultPayloadSchema), createResultByFoodName);
router.get('/results/:id', authenticateToken, getResultById);
router.get('/history/profiles/:profileId', authenticateToken, getAllResults);

router.get('/results/profiles/:profileId', authenticateToken, getResultsByProfileId);
router.get('/results/profiles/:profileId/latest', authenticateToken, getThreeLatestResultsByProfileId);
router.get('/results/profiles/:profileId/today', authenticateToken, getTotalNutritionTodayByProfileId);

export default router;