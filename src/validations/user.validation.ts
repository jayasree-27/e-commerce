import Joi from "joi";

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required"
  }),
  password: Joi.string()
    .min(6)
    .max(32)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required"
    }),
  firstName: Joi.string().min(2).required().messages({
    "any.required": "First name is required"
  }),
  lastName: Joi.string().min(2).required().messages({
    "any.required": "Last name is required"
  }),
  role: Joi.string().valid("admin", "user", "customer").optional()
});


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default{
    registerUserSchema,
    loginSchema,
}