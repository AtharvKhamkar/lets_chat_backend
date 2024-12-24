import * as express from "express";
import controller from "./user.controller.js";

export default express
  .Router()
  .get("/users-list", controller.getUserList)
  .get("/detail", controller.getUserDetails);
