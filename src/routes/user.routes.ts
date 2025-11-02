import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerUserSchema } from "../validations/user.validation";

const router = Router();

router.post("/register", validate(registerUserSchema),registerUserController);
router.post('/login',validate(loginSchema),loginUserController);

export default router;
