import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

/**
 * ========================
 * Product Schemas
 * ========================
 */
export const addProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  productModel: Joi.string().trim().min(1).max(50).optional(),
  productOrigin: Joi.string().trim().min(1).max(50).optional(),
  description: Joi.string().trim().max(1000).optional(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
}).unknown(false);

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  productModel: Joi.string().trim().min(1).max(50).optional(),
  productOrigin: Joi.string().trim().min(1).max(50).optional(),
  description: Joi.string().trim().max(1000).optional(),
  price: Joi.number().positive().optional(),
  quantity: Joi.number().integer().min(0).optional(),
})
  .min(1)
  .unknown(false);

/**
 * ========================
 * Validation Middleware
 * ========================
 */
export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    next();
  };

export const validateAddProduct = validate(addProductSchema);
export const validateUpdateProduct = validate(updateProductSchema);
