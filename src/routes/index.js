import { Router } from 'express';
import users from '../services/users/routes/index.js';
import authentications from '../services/authentications/routes/index.js';
import profiles from '../services/profiles/routes/index.js';
import foods from '../services/foods/routes/index.js';

const router = Router();

router.use('/', users);
router.use('/', authentications);
router.use('/', profiles);
router.use('/', foods);

export default router;