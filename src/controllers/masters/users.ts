import { Request, Response } from 'express';
import { z } from 'zod';
import { Op } from 'sequelize';
import { UserMaster, userCreateSchema, userUpdateSchema, changePasswordSchema } from '../../models/masters/users';
import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../responseObject';
import { validateBody } from '../../middleware/zodValidator';
import { hashPassword, verifyPassword } from '../configuration/login/hash';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const search = req.query.search?.toString() || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const paginate = String(req.query.paginate || 'false') === 'true';
        const offset = (page - 1) * limit;

        const whereCondition = search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { uniqueName: { [Op.like]: `%${search}%` } },
                ],
            }
            : {};

        if (paginate) {
            const { rows, count } = await UserMaster.findAndCountAll({
                where: whereCondition,
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
            where: whereCondition,
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
        const validatedData = validateBody(userUpdateSchema, req.body, res);
        if (!validatedData) return;

        const { id } = req.params;

        const user = await UserMaster.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

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
        const user = await UserMaster.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

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

        const storedPassword: string  = (user as any).password;

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
