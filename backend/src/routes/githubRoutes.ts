import { Router } from 'express';
import { getUser } from '../controllers/githubController';

const router = Router();

router.get('/api/', getUser);

export default router;