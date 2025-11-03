import db from "../config/db";
import { type ProductAttributes } from "../models/product.model";
import { UserProduct } from "../models/userProduct.model";

export const createProduct = async (productData: ProductAttributes, userId: number) => {
    const product = await db.Product.create(productData);
    await UserProduct.create({
        userId,
        productId: product.id
    });

    return product;
};


export const findProductById = async (id: number) => {
    return await db.Product.findByPk(id);
};

export const updateProduct = async (product: any, data: any) => {
    return await product.update(data);
};

export const deleteProduct = async (product: any) => {
    return await product.destroy();
};

export const findAllProducts = async () => {
    return await db.Product.findAll();
};