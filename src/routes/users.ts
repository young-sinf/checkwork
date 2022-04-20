import { Router } from "express";
import validator from "../middlewares/validator";
import * as userController from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/:userId", userController.getUser);
userRouter.post("/", validator("createUser"), userController.createUser);

export default userRouter;