import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import asyncHandler from "express-async-handler";

export const addProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  productModel: Joi.string().trim().min(1).max(50).required(),
  description: Joi.string().trim().max(1000).optional(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  productModel: Joi.string().trim().min(1).max(50).optional(),
  description: Joi.string().trim().max(1000).optional(),
  price: Joi.number().positive().optional(),
  quantity: Joi.number().integer().min(0).optional(),
});

export const validate = (schema: ObjectSchema) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      res.status(400);
      throw new Error(`Validation error: ${messages}`);
    }
    next();
  });

export const validateAddProduct = validate(addProductSchema);
export const validateUpdateProduct = validate(updateProductSchema);
