import { Router } from 'express';
import {
  createRank,
  getRanks,
  getRankById,
  updateRankById,
  deleteRankById,
} from '../controller/rank-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { rankPayloadSchema } from '../validator/schema.js';
import { upload } from '../../../middlewares/upload.js';

const router = Router();

router.post('/ranks', upload.single('icon'), validate(rankPayloadSchema), createRank);
router.get('/ranks', getRanks);
router.get('/ranks/:id', getRankById);
router.put('/ranks/:id', upload.single('icon'), validate(rankPayloadSchema), updateRankById);
router.delete('/ranks/:id', deleteRankById);

export default router;
