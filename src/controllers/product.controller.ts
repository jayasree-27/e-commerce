import { Request, Response } from "express";
import {
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct,
    findAllProducts
} from "../repository/product.repository";
import db from "../config/db";

interface authRequest extends Request {
    user?: any;
}

export const createProductController = async (req: authRequest, res: Response) => {
    try {
        const { name, description, price, stock } = req.body;
        const user = req.user!;

        const product = await createProduct(
            { name, description, price, stock } as any,
            user.id
        );

        return res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Product creation failed" });
    }
};


export const getAllProductsController = async (req: authRequest, res: Response) => {
    try {
        const user = req.user!;

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Only admin can view all products" });
        }

        const products = await findAllProducts();

        return res.status(200).json({
            message: "Products fetched successfully",
            count: products.length,
            products
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Failed to fetch products" });
    }
};


export const getProductByIdController = async (req: authRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = req.user!;

        const product: any = await findProductById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (user.role !== "admin") {
            const userProduct = await db.UserProduct.findOne({
                where: { userId: user.id, productId: product.id }
            });
            if (!userProduct) {
                return res.status(403).json({ message: "Not authorized to access this product" });
            }
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            product
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Failed to fetch product" });
    }
};


export const updateProductController = async (req: authRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = req.user!;

        const product: any = await findProductById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Only admin can update products" });
        }

        const updatedProduct = await updateProduct(product, req.body);

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Product update failed" });
    }
};


export const deleteProductController = async (req: authRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = req.user!;

        const product: any = await findProductById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Only admin can delete products" });
        }

        await deleteProduct(product);
        return res.status(200).json({ message: "Product deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Product delete failed" });
    }
};
