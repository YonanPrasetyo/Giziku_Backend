import { Router } from 'express';
import {
  createFood,
} from '../controller/food-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { foodPayloadSchema } from '../validator/schema.js';
import { upload } from '../../../middlewares/upload.js';

const router = Router();

router.post('/foods', upload.single('image'), validate(foodPayloadSchema), createFood);

export default router;