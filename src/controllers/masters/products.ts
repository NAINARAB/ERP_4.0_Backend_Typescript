import { Request, Response } from "express";
import { Product } from "../../models/masters/products";
import path from "path";
import { success, servError } from '../../responseObject';

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

        const {
            Product_Code, Product_Name, Short_Name, Product_Description, Brand, Product_Group,
            Pack_Id, UOM_Id, IS_Sold, Display_Order_By, HSN_Code, Gst_P,
            Cgst_P, Sgst_P, Igst_P, ERP_Id, Pos_Brand_Id, IsActive,
            Product_Rate, Max_Rate, Alter_Id, Created_By
        } = req.body;

        const now = new Date();

        const product = await Product.create({
            Product_Code, Product_Name, Short_Name, Product_Description, Brand,
            Product_Group, Pack_Id, UOM_Id, IS_Sold, Display_Order_By,
            HSN_Code, Gst_P, Cgst_P, Sgst_P, Igst_P, ERP_Id,
            Pos_Brand_Id, IsActive: IsActive ?? 1, Product_Rate, Max_Rate, Alter_Id, Created_By,
            Created_Time: now, Alter_By: Created_By ?? null, Alter_Time: now,
            ...imageCols
        } as any);

        success(res, 'New product created', [product]);
    } catch (e: any) {
        servError(e, res, "Failed to create product");
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const existing = await Product.findByPk(id as any);
        if (!existing) return res.status(404).json({ error: "Product not found" });

        const imageCols = req.file ? buildImageColumns(req.file) : {};

        const {
            Product_Code,
            Product_Name,
            Short_Name,
            Product_Description,
            Brand,
            Product_Group,
            Pack_Id,
            UOM_Id,
            IS_Sold,
            Display_Order_By,
            HSN_Code,
            Gst_P,
            Cgst_P,
            Sgst_P,
            Igst_P,
            ERP_Id,
            Pos_Brand_Id,
            IsActive,
            Product_Rate,
            Max_Rate,
            Alter_Id,
            Alter_By
        } = req.body;

        const now = new Date();

        await existing.update({
            Product_Code,
            Product_Name,
            Short_Name,
            Product_Description,
            Brand,
            Product_Group,
            Pack_Id,
            UOM_Id,
            IS_Sold,
            Display_Order_By,
            HSN_Code,
            Gst_P,
            Cgst_P,
            Sgst_P,
            Igst_P,
            ERP_Id,
            Pos_Brand_Id,
            IsActive,
            Product_Rate,
            Max_Rate,
            Alter_Id,
            Alter_By: Alter_By ?? existing.getDataValue("Alter_By"),
            Alter_Time: now,
            ...imageCols
        } as any);

        res.json(existing);
    } catch (err: any) {
        res.status(400).json({ error: err.message || "Failed to update product" });
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
