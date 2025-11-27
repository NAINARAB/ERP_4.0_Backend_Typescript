import { Request, Response } from 'express';
import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { BrandMaster, brandCreateSchema, brandUpdateSchema } from '../../../models/masters/product/brand.model';
import { isNumber, randomNumber } from '../../../middleware/helper';

export const getBrands = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await BrandMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Brand_Name", "ASC"]],
            });

            return dataFound(res, rows, "dataFound", {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await BrandMaster.findAll({
            where,
            order: [["Brand_Name", "ASC"]],
        });

        dataFound(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const brand = await BrandMaster.findByPk(id);
        if (!brand) return notFound(res, 'Brand not found');

        dataFound(res, [brand]);
    } catch (e) {
        servError(e, res);
    }
};

export const createBrand = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(
            brandCreateSchema,
            { ...req.body, Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const newBrand = await BrandMaster.create(validatedBody);

        created(res, newBrand);
    } catch (e) {
        servError(e, res);
    }
};

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(
            brandUpdateSchema,
            { ...req.body, Alter_at: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const brand = await BrandMaster.findByPk(id);
        if (!brand) return notFound(res, 'Brand not found');

        await brand.update(validatedBody);

        updated(res, brand);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const brand = await BrandMaster.findByPk(id);
        if (!brand) return notFound(res, 'Brand not found');

        await brand.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};