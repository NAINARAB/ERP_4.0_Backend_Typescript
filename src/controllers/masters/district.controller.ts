import { Request, Response } from 'express';
import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../responseObject';
import { validateBody } from '../../middleware/zodValidator';
import { DistrinctMaster, districtSchema } from '../../models/masters/district.model';
import { isNumber } from '../../middleware/helper';

export const getDistrict = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await DistrinctMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["District_Name", "ASC"]],
            });

            return dataFound(res, rows, "dataFound", {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await DistrinctMaster.findAll({
            where,
            order: [["District_Name", "ASC"]],
        });

        dataFound(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getDistrictById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const district = await DistrinctMaster.findByPk(id);
        if (!district) return notFound(res, 'District not found');

        dataFound(res, [district]);
    } catch (e) {
        servError(e, res);
    }
};

export const createDistrict = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(districtSchema, req.body, res);
        if (!validatedBody) return;

        const newDistrict = await DistrinctMaster.create(validatedBody);

        created(res, newDistrict);
    } catch (e) {
        servError(e, res);
    }
};

export const updateDistrict = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(districtSchema, req.body, res);
        if (!validatedBody) return;

        const district = await DistrinctMaster.findByPk(id);
        if (!district) return notFound(res, 'District not found');

        await district.update(validatedBody);

        updated(res, district);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteDistrict = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');
        
        const district = await DistrinctMaster.findByPk(id);
        if (!district) return notFound(res, 'District not found');

        await district.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};