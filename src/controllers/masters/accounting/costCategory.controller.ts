import { Request, Response } from 'express';
import { created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { CostCategoryMaster, costCategoryCreateSchema, costCategoryUpdateSchema } from '../../../models/masters/accounting/costCategory.model';
import { isNumber, randomNumber } from '../../../middleware/helper';

export const getCostCategories = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;
        if (paginate) {
            const { rows, count } = await CostCategoryMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Cost_Category", "ASC"]],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await CostCategoryMaster.findAll({
            where,
            order: [["Cost_Category", "ASC"]],
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getCostCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const costCategory = await CostCategoryMaster.findByPk(id);
        if (!costCategory) return notFound(res, 'Cost Category not found');

        sentData(res, [costCategory]);
    } catch (e) {
        servError(e, res);
    }
};

export const createCostCategory = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(
            costCategoryCreateSchema,
            { ...req.body, Alter_Id: randomNumber(), Created_Time: new Date() },
            res
        );
        if (!validatedBody) return;

        const newCostCategory = await CostCategoryMaster.create(validatedBody);

        created(res, newCostCategory);
    } catch (e) {
        servError(e, res);
    }
};

export const updateCostCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(
            costCategoryUpdateSchema,
            { ...req.body, Alter_Time: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const costCategory = await CostCategoryMaster.findByPk(id);
        if (!costCategory) return notFound(res, 'Cost Category not found');

        await costCategory.update(validatedBody);

        updated(res, costCategory);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteCostCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const costCategory = await CostCategoryMaster.findByPk(id);
        if (!costCategory) return notFound(res, 'Cost Category not found');

        await costCategory.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};
