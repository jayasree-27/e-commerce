import { Router } from 'express';
import userRoutes from "../routes/user.routes";
import productRoutes from "../routes/product.routes";

const router =Router();

router.use("/users",userRoutes);
router.use("/products",productRoutes);

export default router;
