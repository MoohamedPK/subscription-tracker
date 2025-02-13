import {Router} from "express";
import {singIn, singUp, singOut} from "../controllers/auth.controller.js" 

const authRouter = Router();

authRouter.post("/sign-in", singIn);

authRouter.post("/sign-up", singUp);

authRouter.post("/sign-out", singOut);

export default authRouter;