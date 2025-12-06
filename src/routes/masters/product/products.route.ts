import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  softDeleteProduct
} from "../../../controllers/masters/product/products.controller";
import { uploadImage } from "../../../middleware/uploadMiddleware";
import { paginationData } from "../../../middleware/pagination";
import { imageFolder } from "../../../middleware/createUploadFolders";

const router = Router();

router.get("/", paginationData(["Product_Name"]), getProducts);
router.get("/:id", getProductById);
router.post("/", uploadImage(imageFolder.product), createProduct);
router.put("/:id", uploadImage(imageFolder.product), updateProduct);
router.delete("/:id", softDeleteProduct);

export default router;
