import { Request, Response } from 'express';
import { created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { CostCenterMaster, costCenterCreateSchema, costCenterUpdateSchema } from '../../../models/masters/accounting/costCenter.model';
import { isNumber, randomNumber } from '../../../middleware/helper';

export const getCostCenters = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;
        if (paginate) {
            const { rows, count } = await CostCenterMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Cost_Center", "ASC"]],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await CostCenterMaster.findAll({
            where,
            order: [["Cost_Center", "ASC"]],
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getCostCenterById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const costCenter = await CostCenterMaster.findByPk(id);
        if (!costCenter) return notFound(res, 'Cost Center not found');

        sentData(res, [costCenter]);
    } catch (e) {
        servError(e, res);
    }
};

export const createCostCenter = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(
            costCenterCreateSchema,
            { ...req.body, Alter_Id: randomNumber(), Created_Time: new Date() },
            res
        );
        if (!validatedBody) return;

        const newCostCenter = await CostCenterMaster.create(validatedBody);

        created(res, newCostCenter);
    } catch (e) {
        servError(e, res);
    }
};

export const updateCostCenter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(
            costCenterUpdateSchema,
            { ...req.body, Alter_Time: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const costCenter = await CostCenterMaster.findByPk(id);
        if (!costCenter) return notFound(res, 'Cost Center not found');

        await costCenter.update(validatedBody);

        updated(res, costCenter);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteCostCenter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const costCenter = await CostCenterMaster.findByPk(id);
        if (!costCenter) return notFound(res, 'Cost Center not found');

        await costCenter.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};
