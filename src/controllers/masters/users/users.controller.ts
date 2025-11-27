import { Request, Response } from 'express';

import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { UserMaster, userCreateSchema, userUpdateSchema } from '../../../models/masters/users/users.model';
import { hashPassword, verifyPassword } from '../../configuration/login/hash';
import { isNumber } from '../../../middleware/helper';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await UserMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['id', 'DESC']],
            });

            return dataFound(res, rows, 'dataFound', {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await UserMaster.findAll({
            where,
            order: [['id', 'DESC']],
        });

        dataFound(res, data);
    } catch (e) {
        servError(e, res);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const user = await UserMaster.findByPk(id);
        if (!user) return notFound(res, 'User not found');
        dataFound(res, [user]);
    } catch (e) {
        servError(e, res);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(userCreateSchema, req.body, res);
        if (!validatedData) return;

        const hashed = await hashPassword(validatedData.password);

        const newUser = await UserMaster.create({
            ...validatedData,
            password: hashed,
        });

        created(res, newUser);
    } catch (e) {
        servError(e, res);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedData = validateBody(userUpdateSchema, req.body, res);
        if (!validatedData) return;

        const user = await UserMaster.findByPk(id);
        if (!user) return notFound(res, 'User not found');

        delete (validatedData as any).password;

        await user.update(validatedData);

        updated(res, user);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const user = await UserMaster.findByPk(id);
        if (!user) return notFound(res, 'User not found');

        await user.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await UserMaster.findByPk(id);
        if (!user) return notFound(res, 'User not found');

        const storedPassword: string = (user as any).password;

        if (!storedPassword) return servError(new Error('Stored password not available'), res);

        const match = await verifyPassword(oldPassword, storedPassword);
        if (!match) {
            return invalidInput(res, 'Old password is incorrect');
        }

        const hashed = await hashPassword(newPassword);

        await user.update({ password: hashed });

        updated(res);
    } catch (e) {
        servError(e, res);
    }
};
