import {Request, Response} from 'express';
import { TransactionSchema } from '../validators/transaction.validator';
import { createTransaction, deleteTransactionbyId, getTransactions } from '../services/transaction.service';
import { ZodError } from 'zod';
import { AuthRequest } from '../types/auth.types';

export async function addTransaction(req:AuthRequest, res:Response){
    try{
            const validatedData= TransactionSchema.parse(req.body);
    
            const transaction = await createTransaction({
                ...validatedData,
                userId: req.userId!
            });
    
            
            return res.status(201).json({success: true, transaction});
    
        }catch (error) {
            console.error(error);
            if(error instanceof ZodError) {
                return res.status(400).json({success: false, message: 'Validation error', errors: error.issues.map((issue) => issue.message)});
            }
            return res.status(500).json({success: false, message: 'Server error'});
        }
    }

export async function getAllTransactions(req:AuthRequest, res:Response){
    try{
            
            const transactions = await getTransactions(req.userId!);
    
            
            return res.status(200).json({success: true, transactions});
    
        }catch(error){

   console.error(
      "GET Transactions Error:",
      error
   );

   return res.status(500).json({
      success:false,
      message:'Server error'
   });
}
    }
export async function deleteTransaction(req:AuthRequest, res:Response){
    try{
            
            const id= req.params.id as string;
            await deleteTransactionbyId(id, req.userId!);
    
            
            return res.status(200).json({success: true, message:"Transaction deleted successfully"});
    
        }catch(error){
   return res.status(404).json({
      success:false,
      message:error instanceof Error ? error.message : "Server error"
   });
}
    }


    
