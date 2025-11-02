import db from "../config/db";
import { type ProductAttributes} from "../models/product.model";

export const createProduct = async (data: ProductAttributes) => {
    return await db.Product.create(data);
};

export const updateProduct= async (id: number, data: any) => {
    const product = await db.Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.update(data);
    return product;
};

export const deleteProduct = async (id: number) => {
    const product = await db.Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.destroy();
    return { message: "Product deleted successfully" };
};

export const getAllProducts = async () => {
    return await db.Product.findAll();
};
