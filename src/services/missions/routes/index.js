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

const router = Router();

router.post('/missions', authenticateToken, validate(missionPayloadSchema), createMission);
router.get('/missions', authenticateToken, getMissions);
router.get('/missions/:id', authenticateToken, getMissionById);
router.put('/missions/:id', authenticateToken, validate(missionPayloadSchema), updateMissionById);
router.delete('/missions/:id', authenticateToken, deleteMissionById);

export default router;
