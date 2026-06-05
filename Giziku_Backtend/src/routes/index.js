import { Router } from 'express';
import users from '../services/users/routes/index.js';
import authentications from '../services/authentications/routes/index.js';
import profiles from '../services/profiles/routes/index.js';
import missions from '../services/missions/routes/index.js';
import userMissions from '../services/user-missions/routes/index.js';
import ranks from '../services/ranks/routes/index.js';
import nutritionStandart from '../services/nutrition-standart/routes/index.js';
import result from '../services/result/routes/index.js';
import food from '../services/food/routes/index.js';

const router = Router();

router.use('/', users);
router.use('/', authentications);
router.use('/', profiles);
router.use('/', missions);
router.use('/', userMissions);
router.use('/', ranks);
router.use('/', nutritionStandart);
router.use('/', result);
router.use('/', food);

export default router;