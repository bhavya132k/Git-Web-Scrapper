import { Router } from 'express';
import { generateDependencyTree } from '../controllers/dependencyController';

const router = Router();

router.post('/generate-dependency-tree', generateDependencyTree);

export default router;