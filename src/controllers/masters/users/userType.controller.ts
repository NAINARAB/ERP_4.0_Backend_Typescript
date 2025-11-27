import { Request, Response } from 'express';
import { created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { UserTypeMaster, userTypeSchema } from '../../../models/masters/users/userType.model';
import { isNumber } from '../../../middleware/helper';


export const getAllUserTypes = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await UserTypeMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["UserType", "ASC"]],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await UserTypeMaster.findAll({
            where,
            order: [["UserType", "ASC"]],
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getUserTypeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const userType = await UserTypeMaster.findByPk(id);
        if (!userType) return notFound(res, 'UserType not found');

        return sentData(res, [userType]);
    } catch (error) {
        return servError(error, res);
    }
};

export const createUserType = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(userTypeSchema, {...req.body, IsActive: 1}, res);
        if (!validatedBody) return;

        const userType = await UserTypeMaster.create(validatedBody);
        return created(res, userType);
    } catch (e) {
        return servError(e, res);
    }
};

export const updateUserType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(userTypeSchema, {...req.body, IsActive: 1}, res);
        if (!validatedBody) return;

        const userType = await UserTypeMaster.findByPk(id);
        if (!userType) return notFound(res, 'UserType not found');

        await userType.update(validatedBody);
        return updated(res, [userType]);
    } catch (error) {
        return servError(error, res);
    }
};

export const deleteUserType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const userType = await UserTypeMaster.findByPk(id);
        if (!userType) return notFound(res, 'UserType not found');

        await userType.update({ IsActive: 0 });
        return deleted(res, 'UserType deleted successfully');
    } catch (error) {
        return servError(error, res);
    }
};
