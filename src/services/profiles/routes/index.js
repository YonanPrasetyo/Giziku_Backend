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

const router = Router();

router.post('/profiles', validate(profilePayloadSchema), createProfile);
router.get('/profiles', getProfiles);
router.get('/profiles/:id', getProfileById);
router.put('/profiles/:id', validate(profilePayloadSchema), updateProfileById);
router.delete('/profiles/:id', deleteProfileById);

export default router;
