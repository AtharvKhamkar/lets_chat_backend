import { Router } from "express";
import authRouter from './Auth/router.js';
import userRouter from './User/router.js';
import chatRouter from './Chat/router.js'

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter)
router.use('/chat',chatRouter)

export default router;