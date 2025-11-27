import { Request, Response } from 'express';
import { dataFound, created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { AreaMaster, areaSchema } from '../../../models/masters/users/area.model';
import { isNumber } from '../../../middleware/helper';

export const getAllAreas = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await AreaMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Area_Name", "ASC"]],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await AreaMaster.findAll({
            where,
            order: [["Area_Name", "ASC"]],
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getAreaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const area = await AreaMaster.findByPk(id);
        if (!area) return notFound(res, 'Area not found');

        sentData(res, [area]);
    } catch (e) {
        servError(e, res);
    }
};

export const createArea = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(areaSchema, req.body, res);
        if (!validatedBody) return;

        const newArea = await AreaMaster.create(validatedBody);
        created(res, [newArea], 'Area created successfully');
    } catch (e) {
        servError(e, res);
    }
};

export const updateArea = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(areaSchema, req.body, res);
        if (!validatedBody) return;

        const area = await AreaMaster.findByPk(id);
        if (!area) return notFound(res, 'Area not found');

        await area.update(validatedBody);

        updated(res, area);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteArea = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const area = await AreaMaster.findByPk(id);
        if (!area) return notFound(res, 'Area not found');

        await area.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};