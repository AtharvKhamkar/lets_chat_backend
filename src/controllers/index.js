import { Router } from "express";
import authRouter from './Auth/router.js';
import userRouter from './User/router.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter)

export default router;