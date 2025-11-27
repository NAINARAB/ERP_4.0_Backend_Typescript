import { Request, Response } from 'express';
import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { StateMaster, stateSchema } from '../../../models/masters/users/state.model';
import { isNumber } from '../../../middleware/helper';

export const getState = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await StateMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["State_Name", "ASC"]],
            });

            return dataFound(res, rows, "dataFound", {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await StateMaster.findAll({
            where,
            order: [["State_Name", "ASC"]],
        });

        dataFound(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getStateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const state = await StateMaster.findByPk(id);
        if (!state) return notFound(res, 'State not found');

        dataFound(res, [state]);
    } catch (e) {
        servError(e, res);
    }
};

export const createState = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(stateSchema, req.body, res);
        if (!validatedBody) return;

        const newState = await StateMaster.create(validatedBody);

        created(res, newState);
    } catch (e) {
        servError(e, res);
    }
};

export const updateState = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(stateSchema, req.body, res);
        if (!validatedBody) return;

        const state = await StateMaster.findByPk(id);
        if (!state) return notFound(res, 'State not found');

        await state.update(validatedBody);

        updated(res, state);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteState = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const state = await StateMaster.findByPk(id);
        if (!state) return notFound(res, 'State not found');

        await state.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};