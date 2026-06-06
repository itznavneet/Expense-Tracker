import {Request, Response} from 'express';
import { TransactionSchema } from '../validators/transaction.validator';
import { createTransaction, getTransactions } from '../services/transaction.service';
import { ZodError } from 'zod';
import { AuthRequest } from '../types/auth.types';
import { getTotalExpense, getTotalIncome } from '../services/dashboard.service';

export async function getSummary(req:AuthRequest, res:Response){
    try{
    
            const incomeResult = await getTotalIncome(
                req.userId!
            );
            const expenseResult = await getTotalExpense(
                req.userId!
            );
            
            const income= incomeResult._sum.amount || 0;
            const expense= expenseResult._sum.amount || 0;

            const balance= income - expense;
    
            return res.status(200).json({success: true, summary:{
                income,
                expense,
                balance
            }});
    
        }catch (error) {
            return res.status(500).json({success: false, message: 'Server error'});
        }
    }
