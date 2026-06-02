import { Router } from 'express';
import {
  createFood,
  getFoods,
  getFoodById,
  updateFoodById,
  deleteFoodById,
} from '../controller/food-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { foodPayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import authorizeRoles from '../../../middlewares/authorize.js';

const router = Router();

router.post('/foods', authenticateToken, authorizeRoles('admin'), validate(foodPayloadSchema), createFood);
router.get('/foods', authenticateToken, authorizeRoles('admin'), getFoods);
router.get('/foods/:id', authenticateToken, authorizeRoles('admin'), getFoodById);
router.put('/foods/:id', authenticateToken, authorizeRoles('admin'), validate(foodPayloadSchema), updateFoodById);
router.delete('/foods/:id', authenticateToken, authorizeRoles('admin'), deleteFoodById);

export default router;