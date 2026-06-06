import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {loginSchema, registerSchema} from '../validators/auth.validator';
import { createUser, findUserByEmail, findUserById } from '../services/auth.service';
import { ZodError } from 'zod/v3';
import { success } from 'zod';
import { generateToken } from '../utility/jwt';
import { AuthRequest } from "../types/auth.types";


export async function register(req: Request, res: Response) {
    try{
        const validatedData= registerSchema.parse(req.body);

        const existingUser = await findUserByEmail(validatedData.email);

        if(existingUser){
            return res.status(400).json({success: false, message: 'Email already in use'});
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        const user = await createUser({
            ...validatedData,
            password: hashedPassword
        });

        return res.status(201).json({success: true, message: 'User created successfully', user:{
            id: user.id,
            name: user.name,
            email: user.email
        }});

    }catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).json({success: false, message: 'Validation error', errors: error.issues.map((issue) => issue.message)});
        }
        return res.status(500).json({success: false, message: 'Server error'});
    }
}

export async function login(req:AuthRequest, res: Response){
    try {
        const validatedData= loginSchema.parse(req.body);

        const user = await findUserByEmail(validatedData.email);

        if(!user){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

       const isPasswordCorrect= await bcrypt.compare(validatedData.password, user.password)

       if(!isPasswordCorrect){
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
       }

       const token= generateToken(user.id);

        return res.status(200).json({success: true, message: 'User logged in successfully', token,user:{
            id: user.id,
            name: user.name,
            email: user.email
        }});
    } catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).json({success: false, message: 'Validation error', errors: error.issues.map((issue) => issue.message)});
        }
        return res.status(500).json({success: false, message: 'Server error'});
    }
}
export async function getMe(req:AuthRequest, res: Response){
    try {

        const user = await findUserById(req.userId!);

        if(!user){
           return res.status(404).json({
        success:false,
        message:"User not found"
      });
        }

        return res.status(200).json({success: true, message: 'User created successfully', user:{
            id: user.id,
            name: user.name,
            email: user.email
        }});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server error'});
    }
}


