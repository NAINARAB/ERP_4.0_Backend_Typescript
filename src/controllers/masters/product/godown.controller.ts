import { Request, Response } from 'express';

import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { GodownMaster, godownCreateSchema, godownUpdateSchema } from '../../../models/masters/product/godown.model';
import { randomNumber, isNumber } from '../../../middleware/helper';

export const getGodowns = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await GodownMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['Godown_Id', 'DESC']],
            });

            return dataFound(res, rows, 'dataFound', {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await GodownMaster.findAll({
            where,
            order: [['Godown_Id', 'DESC']],
        });

        dataFound(res, data);
    } catch (e) {
        servError(e, res);
    }
};

export const getGodownById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const godown = await GodownMaster.findByPk(id);
        if (!godown) return notFound(res, 'Godown not found');

        dataFound(res, [godown]);
    } catch (e) {
        servError(e, res);
    }
};

export const createGodown = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(
            godownCreateSchema,
            { ...req.body, Alter_Id: randomNumber(), Created_Time: new Date() },
            res
        );
        if (!validatedData) return;

        const newGodown = await GodownMaster.create(validatedData);

        created(res, newGodown);
    } catch (e) {
        servError(e, res);
    }
};

export const updateGodown = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedData = validateBody(
            godownUpdateSchema,
            { ...req.body, Alter_Time: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedData) return;

        const godown = await GodownMaster.findByPk(id);
        if (!godown) return notFound(res, 'Godown not found');

        await godown.update(validatedData);

        updated(res, godown);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteGodown = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const godown = await GodownMaster.findByPk(id);
        if (!godown) return notFound(res, 'Godown not found');

        await godown.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};
