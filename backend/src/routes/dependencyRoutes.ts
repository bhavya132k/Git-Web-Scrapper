import { Router } from 'express';
import { getDependencies } from '../controllers/dependencyController';


const router = Router();

router.get('/scrape-dependencies/:owner/:repoName', getDependencies);

export default router;