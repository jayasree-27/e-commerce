import { Router } from "express";
import {
    createProductController,
    updateProductController,
    deleteProductController,
    getAllProductsController,  
} from "../controllers/product.controller";

import { authMiddleware } from "../middlewares/auth.middleware"; 
import { authorizeRoles } from "../middlewares/roleauth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createProductSchema,updateProductSchema } from "@/validations/product.validation";

const router = Router();

router.get("/", authMiddleware,authorizeRoles("admin"),getAllProductsController);
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin", "user"),
    validate(createProductSchema),
    createProductController
);

router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("admin", "user"),
    validate(updateProductSchema),
    updateProductController
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin", "user"),
    deleteProductController
);

export default router;
