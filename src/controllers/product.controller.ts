import { Request, Response } from "express";
import {
    createProductService,
    updateProductService,
    deleteProductService,
    getAllProductsService
} from "../repository/product.repository";

export const createProductController = async (req: Request, res: Response) => {
    try {
        const product = await createProductService(req.body);
        res.status(201).json(product);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await updateProductService(id, req.body);
        res.json(product);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const msg = await deleteProductService(id);
        res.json(msg);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllProductsController = async (req: Request, res: Response) => {
    const products = await getAllProductsService();
    res.json(products);
};


