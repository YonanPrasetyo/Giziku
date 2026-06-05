import { Router } from 'express';
import {
  createNutritionStandard,
  getNutritionStandards,
  getNutritionStandardById,
  updateNutritionStandardById,
  deleteNutritionStandardById,
  getNutritionStandardByAgeAndGender,
} from '../controller/nutrition-standart-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { nutritionStandartPayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import authorizeRoles from '../../../middlewares/authorize.js';

const router = Router();

router.post('/nutrition-standards', authenticateToken, authorizeRoles('admin'), validate(nutritionStandartPayloadSchema), createNutritionStandard);
router.get('/nutrition-standards', authenticateToken, authorizeRoles('admin'), getNutritionStandards);
router.get('/nutrition-standards/:id', authenticateToken, authorizeRoles('admin'), getNutritionStandardById);
router.put('/nutrition-standards/:id', authenticateToken, authorizeRoles('admin'), validate(nutritionStandartPayloadSchema), updateNutritionStandardById);
router.delete('/nutrition-standards/:id', authenticateToken, authorizeRoles('admin'), deleteNutritionStandardById);

router.get('/nutrition-standards/age/:age/gender/:gender', authenticateToken, authorizeRoles('user'), getNutritionStandardByAgeAndGender);

export default router;