import * as express from 'express';
import controller from './chat.controller.js';
import { upload } from '../../middleware/multer.middleware.js';

export default express.Router()
.post('/create',upload.none(),controller.createRoom);