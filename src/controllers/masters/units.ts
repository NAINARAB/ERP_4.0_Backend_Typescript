import { z } from 'zod';
import { Request, Response } from 'express';
import { UnitMaster } from '../../models/masters/units';
import { Op } from 'sequelize';
import { dataFound, failed, notFound, servError, success } from '../../responseObject';

export const createUnitSchema = z.object({
    Units: z.string().min(1, 'Unit name is required'),
    ERP_Id: z.number().int().nullable().optional(),
    Alter_Id: z.number().int().nullable().optional(),
    Created_By: z.number().int().nullable().optional()
});

export const updateUnitSchema = z.object({
    Units: z.string().min(1).optional(),
    ERP_Id: z.number().int().nullable().optional(),
    Alter_Id: z.number().int().nullable().optional(),
    Alter_By: z.number().int().nullable().optional()
});

export const createUnit = async (req: Request, res: Response) => {
    try {
        const validatedData = createUnitSchema.parse(req.body);
        const data = await UnitMaster.create(validatedData);

        success(res, 'New unit created', [data]);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return failed(res, 'Failed to create', { errors: error.errors });
        }
        servError(error, res);
    }
};

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

export const updateUnit = async (req: Request, res: Response) => {
    try {
        const validatedData = updateUnitSchema.parse(req.body);

        const unit = await UnitMaster.findByPk(req.params.id);
        if (!unit) return notFound(res, 'Unit not found');

        validatedData['Alter_Time'] = new Date();

        await unit.update(validatedData);

        success(res, 'Unit updated successfully', [unit]);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return servError(error, res, 'Failed to update', { errors: error.errors });
        }
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