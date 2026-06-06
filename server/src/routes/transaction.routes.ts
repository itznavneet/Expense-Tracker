import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { addTransaction, getAllTransactions } from '../controllers/transaction.controller';

const router = Router();

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getAllTransactions);

export default router;