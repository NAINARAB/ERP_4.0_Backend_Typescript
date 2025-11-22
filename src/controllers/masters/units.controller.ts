import { Request, Response } from 'express';
import { UnitMaster, UnitCreateSchema, UnitUpdateSchema } from '../../models/masters/units.model';
import { Op } from 'sequelize';
import { dataFound, failed, notFound, servError, success } from '../../responseObject';
import { validateBody } from '../../middleware/zodValidator';
import { randomNumber } from '../../middleware/helper';


export const getUnits = async (req: Request, res: Response) => {
    try {
        const search = req.query.search?.toString() || '';
        const pagination = req.query.pagination === 'true'; // default is false

        const whereCondition = search
            ? { Units: { [Op.like]: `%${search}%` } }
            : {};

        if (!pagination) {
            const data = await UnitMaster.findAll({
                where: whereCondition,
                order: [['Unit_Id', 'DESC']]
            });

            return dataFound(res, data, 'dataFound');
        }

        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const offset = (page - 1) * limit;

        const { rows, count } = await UnitMaster.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [['Unit_Id', 'DESC']]
        });

        return dataFound(res, rows, 'dataFound', {
            totalRecords: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        });

    } catch (e) {
        return servError(e, res)
    }
};

export const getUnitById = async (req: Request, res: Response) => {
    try {
        const unit = await UnitMaster.findByPk(req.params.id);

        if (!unit) return notFound(res, 'Unit not found');

        dataFound(res, [], 'dataFound', { unit });
    } catch (e) {
        servError(e, res);
    }
};

export const createUnit = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(
            UnitCreateSchema,
            { ...req.body, Alter_Id: randomNumber() },
            res
        );
        if (!validatedData) return;

        const data = await UnitMaster.create(validatedData);

        success(res, 'New unit created', [data]);

    } catch (error: any) {
        servError(error, res);
    }
};

export const updateUnit = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(
            UnitUpdateSchema,
            { ...req.body, Alter_Id: randomNumber(), Alter_Time: new Date() },
            res
        );
        if (!validatedData) return;

        const unit = await UnitMaster.findByPk(req.params.id);
        if (!unit) return notFound(res, 'Unit not found');

        await unit.update(validatedData);

        success(res, 'Unit updated successfully', [unit]);
    } catch (error: any) {
        servError(error, res);
    }
};

export const deleteUnit = async (req: Request, res: Response) => {
    try {
        const deleted = await UnitMaster.destroy({
            where: { Unit_Id: req.params.id }
        });

        if (!deleted) return notFound(res, 'Unit not found');

        success(res, 'Unit deleted successfully');
    } catch (error) {
        servError(error, res);
    }
};