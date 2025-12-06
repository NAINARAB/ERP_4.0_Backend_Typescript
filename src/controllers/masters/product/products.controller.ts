import { Request, Response } from "express";
import { Product, productCreationSchema, productUpdateSchema } from "../../../models/masters/product/products.model";
import { brandAccKey, BrandMaster } from "../../../models/masters/product/brand.model";
import { productGroupAccKey, ProductGroupMaster } from "../../../models/masters/product/productGroup.model";
import { packAccKey, PackMaster } from "../../../models/masters/product/packs.model";
import { unitAccKey, UnitMaster } from "../../../models/masters/product/units.model";
import path from "path";
import { sentData, servError, invalidInput, notFound, created, updated, deleted } from '../../../responseObject';
import { validateBody } from "../../../middleware/zodValidator";
import { isNumber, randomNumber } from "../../../middleware/helper";
import { Sequelize } from "sequelize";

function buildImageColumns(file?: Express.Multer.File) {
    if (!file) return { Product_Image_Name: null, Product_Image_Path: null };
    return {
        Product_Image_Name: file.filename,
        Product_Image_Path: path.posix.join("uploads", "products", file.filename)
    };
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await Product.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Product_Name", "ASC"]],
                // include: [
                //     { model: BrandMaster, attributes: ['Brand_Id', 'Brand_Name'] },
                //     { model: ProductGroupMaster, attributes: ['Pro_Group_Id', 'Pro_Group'] },
                //     { model: PackMaster, attributes: ['Pack_Id', 'Pack'] },
                //     { model: UnitMaster, attributes: ['Unit_Id', 'Units'] }
                // ]
                include: [
                    { model: BrandMaster, attributes: [] },
                    { model: ProductGroupMaster, attributes: [] },
                    { model: PackMaster, attributes: [] },
                    { model: UnitMaster, attributes: [] },
                ],
                attributes: {
                    include: [
                        [Sequelize.col(brandAccKey.Brand_Name), 'brandGet'],
                        [Sequelize.col(productGroupAccKey.Pro_Group), 'productGroupGet'],
                        [Sequelize.col(unitAccKey.Units), 'unitGet'],
                        [Sequelize.col(packAccKey.Pack), 'packGet'],
                    ]
                }
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await Product.findAll({
            where,
            order: [["Product_Name", "ASC"]],
            include: [
                { model: BrandMaster, attributes: [] },
                { model: ProductGroupMaster, attributes: [] },
                { model: PackMaster, attributes: [] },
                { model: UnitMaster, attributes: [] },
            ],
            attributes: {
                include: [
                    [Sequelize.col(brandAccKey.Brand_Name), 'brandGet'],
                    [Sequelize.col(productGroupAccKey.Pro_Group), 'productGroupGet'],
                    [Sequelize.col(unitAccKey.Units), 'unitGet'],
                    [Sequelize.col(packAccKey.Pack), 'packGet'],
                ]
            }
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const product = await Product.findByPk(id, {
            include: [
                { model: BrandMaster, attributes: [] },
                { model: ProductGroupMaster, attributes: [] },
                { model: PackMaster, attributes: [] },
                { model: UnitMaster, attributes: [] },
            ],
            attributes: {
                include: [
                    [Sequelize.col(brandAccKey.Brand_Name), 'brandGet'],
                    [Sequelize.col(productGroupAccKey.Pro_Group), 'productGroupGet'],
                    [Sequelize.col(unitAccKey.Units), 'unitGet'],
                    [Sequelize.col(packAccKey.Pack), 'packGet'],
                ]
            }
        });
        if (!product) return notFound(res, 'Product not found');

        sentData(res, [product]);
    } catch (e) {
        servError(e, res);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const imageCols = req.file ? buildImageColumns(req.file) : {};

        const validatedBody = validateBody(
            productCreationSchema,
            {
                ...req.body,
                ...imageCols,
                Alter_Id: randomNumber(),
                IsActive: 1,
                Created_Time: new Date(),
            },
            res
        );
        if (!validatedBody) return;

        const newProduct = await Product.create(validatedBody);

        created(res, newProduct);
    } catch (e) {
        servError(e, res);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const imageCols = req.file ? buildImageColumns(req.file) : {};

        const validatedBody = validateBody(
            productUpdateSchema,
            {
                ...req.body,
                ...imageCols,
                Alter_at: new Date(),
                Alter_Id: randomNumber(),
            },
            res
        );
        if (!validatedBody) return;

        const product = await Product.findByPk(id);
        if (!product) return notFound(res, 'Product not found');

        await product.update(validatedBody);

        updated(res, product);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const product = await Product.findByPk(id);
        if (!product) return notFound(res, 'Product not found');

        await product.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};

export const softDeleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const product = await Product.findByPk(id);
        if (!product) return notFound(res, 'Product not found');

        await product.update({ IsActive: 0 });
        updated(res, product);

    } catch (e) {
        servError(e, res);
    }
}