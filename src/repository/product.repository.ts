import db from "../config/db";
import { type ProductAttributes} from "../models/product.model";

export const createProductService = async (data: ProductAttributes) => {
    return await db.Product.create(data);
};

export const updateProductService = async (id: number, data: any) => {
    const product = await db.Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.update(data);
    return product;
};

export const deleteProductService = async (id: number) => {
    const product = await db.Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.destroy();
    return { message: "Product deleted successfully" };
};

export const getAllProductsService = async () => {
    return await db.Product.findAll();
};

export default{
    createProductService,
    updateProductService,
    deleteProductService,
    getAllProductsService,
}