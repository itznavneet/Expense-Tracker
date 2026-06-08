import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { addTransaction, deleteTransaction, getAllTransactions } from '../controllers/transaction.controller';

const router = Router();

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getAllTransactions);
router.delete('/:id', authMiddleware, deleteTransaction);

export default router;