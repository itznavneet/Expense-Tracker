import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getCategoryController, getSummary } from '../controllers/dashboard.controller';

const router = Router();

router.get('/summary', authMiddleware, getSummary);
router.get('/category-analysis', authMiddleware, getCategoryController);

export default router;