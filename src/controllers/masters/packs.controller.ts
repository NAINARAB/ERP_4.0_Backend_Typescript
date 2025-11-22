import { z } from 'zod';
import { Op } from 'sequelize';
import { packCreateSchema, PackMaster } from '../../models/masters/packs.model';
import { dataFound, success, servError } from '../../responseObject';
import { Response, Request } from 'express';
import { validateBody } from '../../middleware/zodValidator';

const packSchema = z.object({
    Pack: z.string().min(1, "Pack name is required").max(50),
});

export const createPack = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(packCreateSchema, req.body, res);
        if (!validatedData) return;

        const newPack = await PackMaster.create(validatedData);

        success(res, 'Pack created successfully', [newPack]);
    } catch (e) {
        servError(e, res);
    }
};

export const getPacks = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await PackMaster.findAndCountAll({
                where,
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
            where: where,
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
