import { z } from 'zod';
import { Op } from 'sequelize';
import { PackMaster } from '../../models/masters/packs';
import { dataFound, success, servError } from '../../responseObject';
import { Response, Request } from 'express';
import { toNumber } from '../../middleware/helper';

const packSchema = z.object({
    Pack: z.string().min(1, "Pack name is required").max(50),
});

export const createPack = async (req: Request, res: Response) => {
    try {
        const validatedData = packSchema.parse(req.body);

        const maxPack = await PackMaster.findOne({
            attributes: ['Pack_Id'],
            order: [['Pack_Id', 'DESC']],
        });

        const nextPackId = (maxPack?.Pack_Id ?? 0) + 1;

        const newPack = await PackMaster.create({
            Pack_Id: nextPackId,
            ...validatedData
        });

        success(res, 'Pack created successfully', [newPack]);
    } catch (e) {
        servError(e, res);
    }
};

export const getPacks = async (req: Request, res: Response) => {
    try {
        const search = req.query.search?.toString() || '';

        const page = toNumber(String(req.query?.page || '1')) || 1;
        const limit = toNumber(String(req.query?.limit || '10')) || 10;
        const paginate = String(req.query?.paginate || 'false') === 'true';
        const offset = (page - 1) * limit;

        const whereCondition = search
            ? { Pack: { [Op.like]: `%${search}%` } }
            : {};

        if (paginate) {
            const { rows, count } = await PackMaster.findAndCountAll({
                where: whereCondition,
                limit,
                offset,
                order: [['Pack_Id', 'DESC']]
            });

            return dataFound(res, rows, 'dataFound', {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit)
            });
        }

        const data = await PackMaster.findAll({
            where: whereCondition,
            order: [['Pack_Id', 'DESC']]
        });

        dataFound(res, data, 'dataFound');
    } catch (e) {
        servError(e, res);
    }
};

export const getPackById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pack = await PackMaster.findByPk(id);
        if (!pack) return res.status(404).json({ message: 'Pack not found' });
        dataFound(res, [pack], 'dataFound');
    } catch (e) {
        servError(e, res);
    }
};

export const updatePack = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = packSchema.partial().parse(req.body);

        const pack = await PackMaster.findByPk(id);
        if (!pack) return res.status(404).json({ message: 'Pack not found' });

        await pack.update(validatedData);

        success(res, 'Pack updated successfully', [pack]);
    } catch (e) {
        servError(e, res);
    }
};

export const deletePack = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pack = await PackMaster.findByPk(id);
        if (!pack) return res.status(404).json({ message: 'Pack not found' });

        await pack.destroy();
        success(res, 'Pack deleted successfully');
    } catch (e) {
        servError(e, res);
    }
};
