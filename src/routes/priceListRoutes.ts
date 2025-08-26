import { Router } from "express";
import {
  getPriceList,
  createPriceListItem,
  updatePriceListItem,
  deletePriceListItem,
} from "../controllers/productListController";
import {
  validateAddPriceList,
  validateUpdatePriceList,
} from "../middleware/validationMiddleware";

const router = Router();

router.get("/", getPriceList);
router.post("/", validateAddPriceList, createPriceListItem);
router.put("/:id", validateUpdatePriceList, updatePriceListItem);
router.delete("/:id", deletePriceListItem);

export default router;
