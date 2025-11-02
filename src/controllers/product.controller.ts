import { Request, Response } from "express";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
} from "../repository/product.repository";
import { Certificate } from "crypto";

export const createProductController = async (req: Request, res: Response) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await updateProduct(id, req.body);
        res.json(product);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const msg = await deleteProduct(id);
        res.json(msg);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllProductsController = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    res.json(products);
};


