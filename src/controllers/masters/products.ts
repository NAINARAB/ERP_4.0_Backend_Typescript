import { Request, Response } from "express";
import { Product, productCreationSchema, productUpdateSchema } from "../../models/masters/products";
import path from "path";
import { success, servError, invalidInput, notFound, created } from '../../responseObject';
import { validateBody } from "../../middleware/zodValidator";
import { isNumber } from "../../middleware/helper";

function buildImageColumns(file?: Express.Multer.File) {
    if (!file) return { Product_Image_Name: null, Product_Image_Path: null };
    return {
        Product_Image_Name: file.filename,
        Product_Image_Path: path.posix.join("uploads", "products", file.filename)
    };
}

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.findAll({ order: [["Display_Order_By", "ASC"]] });
        res.json(products);
    } catch (err: any) {
        res.status(500).json({ error: err.message || "Failed to fetch products" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id as any);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err: any) {
        res.status(500).json({ error: err.message || "Failed to fetch product" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const imageCols = buildImageColumns(req.file || undefined);

        const now = new Date();

        const validatedData = validateBody(
            productCreationSchema,
            { ...req.body, ...imageCols, Created_Time: now },
            res
        );
        if (!validatedData) return;

        const product = await Product.create(validatedData as any);

        success(res, 'New product created', [product]);
    } catch (e: any) {
        servError(e, res, "Failed to create product");
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!isNumber(id)) return invalidInput(res, "product id is required");

        const existing = await Product.findByPk(id);
        if (!existing) return notFound(res, "Product not found");

        const imageCols = req.file ? buildImageColumns(req.file) : {};
        const now = new Date();

        const validatedData = validateBody(
            productUpdateSchema,
            { ...req.body, ...imageCols, Alter_Time: now },
            res
        );
        if (!validatedData) return;

        await existing.update(validatedData);

        created(res, existing);
    } catch (err: any) {
        servError(err, res, "Failed to update product");
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deleted = await Product.destroy({ where: { Product_Id: id as any } });
        if (!deleted) return res.status(404).json({ error: "Product not found" });
        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message || "Failed to delete product" });
    }
};
