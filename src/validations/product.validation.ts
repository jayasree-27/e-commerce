import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        "any.required": "Product name is required",
        "string.min": "Product name must be at least 2 characters"
    }),
    description: Joi.string().allow("").optional(),
    price: Joi.number().greater(0).required().messages({
        "number.base": "Price must be a number",
        "number.greater": "Price must be greater than 0"
    }),
    stockQuantity: Joi.number().integer().min(0).required().messages({
        "any.required": "Stock quantity is required",
        "number.min": "Stock quantity must be 0 or greater"
    })
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(2).optional(),
    description: Joi.string().optional(),
    price: Joi.number().greater(0).optional(),
    stockQuantity: Joi.number().integer().min(0).optional()
});



