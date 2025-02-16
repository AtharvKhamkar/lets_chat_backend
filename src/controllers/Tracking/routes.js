import * as express from "express";
import { upload } from "../../middleware/multer.middleware.js";
import controller from "./tracking.controller.js";

export default express.Router()
    .post('/start/:roomId',upload.none(),controller.createTrackingRoom)
    .get('/latest/:roomId',controller.getLastTrackingLastLocation);