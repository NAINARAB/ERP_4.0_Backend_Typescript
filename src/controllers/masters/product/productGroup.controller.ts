import { Request, Response } from 'express';
import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { ProductGroupMaster, productGroupCreateSchema, productGroupUpdateSchema } from '../../../models/masters/product/productGroup.model';
import { isNumber, randomNumber } from '../../../middleware/helper';

export const getProductGroups = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;
        if (paginate) {
            const { rows, count } = await ProductGroupMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Pro_Group", "ASC"]],
            });

            return dataFound(res, rows, "dataFound", {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await ProductGroupMaster.findAll({
            where,
            order: [["Pro_Group", "ASC"]],
        });

        dataFound(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getProductGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');
        const productGroup = await ProductGroupMaster.findByPk(id);
        if (!productGroup) return notFound(res, 'Product Group not found');
        dataFound(res, [productGroup]);
    } catch (e) {
        servError(e, res);
    }
};

export const createProductGroup = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(
            productGroupCreateSchema,
            { ...req.body, Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const newProductGroup = await ProductGroupMaster.create(validatedBody);

        created(res, newProductGroup);
    } catch (e) {
        servError(e, res);
    }
};

export const updateProductGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(
            productGroupUpdateSchema,
            { ...req.body, Alter_At: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const [updatedRowsCount, updatedRows] = await ProductGroupMaster.update(validatedBody, {
            where: { Pro_Group_Id: id },
            returning: true,
        });
        if (updatedRowsCount === 0) return notFound(res, 'Product Group not found');

        updated(res, updatedRows[0]);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteProductGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const deleteGroup = await ProductGroupMaster.destroy({ where: { Pro_Group_Id: id } });;
        if (deleteGroup === 0) return notFound(res, 'Product Group not found');

        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};