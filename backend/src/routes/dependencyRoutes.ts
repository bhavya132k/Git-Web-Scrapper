import { Router } from 'express';
import { getDependencies } from '../controllers/dependencyController';


const router = Router();

router.get('/get-dependencies/:owner/:reponame', getDependencies);

export default router;