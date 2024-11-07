import { Router } from 'express';
import { getRepos } from '../controllers/githubController';

const router = Router();
router.get('/api/', getRepos);



export default router;