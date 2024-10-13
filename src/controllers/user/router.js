import * as express from 'express';
import { upload } from '../../middleware/multer.middleware.js';
import controller from './user.controller.js';


export default express.Router()
.post('/register',upload.none(),controller.registerUser)
.post('/login',upload.none(),controller.loginUser)