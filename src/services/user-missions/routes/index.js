import { Router } from 'express';
import {
  createUserMission,
  getUserMissions,
  getUserMissionById,
  updateUserMissionById,
  deleteUserMissionById,
} from '../controller/user-mission-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { userMissionPayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.post('/user-missions', authenticateToken, validate(userMissionPayloadSchema), createUserMission);
router.get('/user-missions', authenticateToken, getUserMissions);
router.get('/user-missions/:id', authenticateToken, getUserMissionById);
router.put('/user-missions/:id', authenticateToken, validate(userMissionPayloadSchema), updateUserMissionById);
router.delete('/user-missions/:id', authenticateToken, deleteUserMissionById);

export default router;
