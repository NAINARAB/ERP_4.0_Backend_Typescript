import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  softDeleteProduct
} from "../../../controllers/masters/product/products.controller";
import { uploadProductImage } from "../../../middleware/uploadMiddleware";
import { paginationData } from "../../../middleware/pagination";

const router = Router();

router.get("/", paginationData(["Product_Name"]), getProducts);
router.get("/:id", getProductById);
router.post("/", uploadProductImage, createProduct);
router.put("/:id", uploadProductImage, updateProduct);
router.delete("/:id", softDeleteProduct);

export default router;
