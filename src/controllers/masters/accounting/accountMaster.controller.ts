import { Request, Response } from 'express';
import { created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { AccountMaster, accountCreateSchema, accountUpdateSchema } from '../../../models/masters/accounting/accounts.model';
import { isNumber, randomNumber } from '../../../middleware/helper';

export const getAccounts = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;
        if (paginate) {
            const { rows, count } = await AccountMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Account_name", "ASC"]],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await AccountMaster.findAll({
            where,
            order: [["Account_name", "ASC"]],
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getAccountById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const account = await AccountMaster.findByPk(id);
        if (!account) return notFound(res, 'Account not found');

        sentData(res, [account]);
    } catch (e) {
        servError(e, res);
    }
};

export const createAccount = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(
            accountCreateSchema,
            { ...req.body, Alter_Id: randomNumber(), Created_Time: new Date() },
            res
        );
        if (!validatedBody) return;

        const newAccount = await AccountMaster.create(validatedBody);

        created(res, newAccount);
    } catch (e) {
        servError(e, res);
    }
};

export const updateAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(
            accountUpdateSchema,
            { ...req.body, Alter_Time: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const account = await AccountMaster.findByPk(id);
        if (!account) return notFound(res, 'Account not found');

        await account.update(validatedBody);

        updated(res, account);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const account = await AccountMaster.findByPk(id);
        if (!account) return notFound(res, 'Account not found');

        await account.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};