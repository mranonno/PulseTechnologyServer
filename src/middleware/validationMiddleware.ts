import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

// ---------------- PRODUCT VALIDATION ----------------
export const addProductSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  productBrand: Joi.string().trim().min(1).max(50).optional().allow(""),
  productModel: Joi.string().trim().min(1).max(50).optional().allow(""),
  productOrigin: Joi.string().trim().min(1).max(50).optional().allow(""),
  description: Joi.string().trim().min(1).max(1000).optional().allow(""),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
}).unknown(true);

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional(),
  productBrand: Joi.string().trim().min(1).max(50).optional().allow(""),
  productModel: Joi.string().trim().min(1).max(50).optional().allow(""),
  productOrigin: Joi.string().trim().min(1).max(50).optional().allow(""),
  description: Joi.string().trim().min(1).max(1000).optional().allow(""),
  price: Joi.number().positive().optional(),
  quantity: Joi.number().integer().min(0).optional(),
})
  .min(1)
  .unknown(true);

// ---------------- PRICE LIST VALIDATION ----------------
export const addPriceListSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  price1: Joi.string().trim().max(100).optional().allow(""),
  price2: Joi.string().trim().max(100).optional().allow(""),
  price3: Joi.string().trim().max(100).optional().allow(""),
  vendorName: Joi.string().trim().min(1).max(100).optional(),
}).unknown(true);

export const updatePriceListSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional(),
  price1: Joi.string().trim().max(100).optional().allow(""),
  price2: Joi.string().trim().max(100).optional().allow(""),
  price3: Joi.string().trim().max(100).optional().allow(""),
  vendorName: Joi.string().trim().min(1).max(100).optional(),
})
  .min(1)
  .unknown(true);

// ---------------- GENERIC VALIDATOR ----------------
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
export const validateAddPriceList = validate(addPriceListSchema);
export const validateUpdatePriceList = validate(updatePriceListSchema);
