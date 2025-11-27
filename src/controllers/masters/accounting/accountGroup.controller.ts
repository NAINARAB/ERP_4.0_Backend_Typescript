import { Request, Response } from 'express';

import { dataFound, created, updated, deleted, servError, notFound, invalidInput } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { AccountGroupMaster, accountGroupCreateSchema, accountGroupUpdateSchema } from '../../../models/masters/accounting/accountGroup.model';
import { randomNumber, isNumber } from '../../../middleware/helper';

export const getAccountGroups = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await AccountGroupMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['Group_Id', 'DESC']],
            });

            return dataFound(res, rows, 'dataFound', {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await AccountGroupMaster.findAll({
            where,
            order: [['Group_Id', 'DESC']],
        });

        dataFound(res, data);
    } catch (e) {
        servError(e, res);
    }
};

export const getAccountGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const accountGroup = await AccountGroupMaster.findByPk(id);
        if (!accountGroup) return notFound(res, 'Account Group not found');

        dataFound(res, [accountGroup]);
    } catch (e) {
        servError(e, res);
    }
};

export const createAccountGroup = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(
            accountGroupCreateSchema,
            { ...req.body, Alter_Id: randomNumber(), Created_Time: new Date() },
            res
        );
        if (!validatedData) return;

        const newAccountGroup = await AccountGroupMaster.create(validatedData);

        created(res, newAccountGroup);
    } catch (e) {
        servError(e, res);
    }
};

export const updateAccountGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedData = validateBody(
            accountGroupUpdateSchema,
            { ...req.body, Alter_Time: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedData) return;

        const accountGroup = await AccountGroupMaster.findByPk(id);
        if (!accountGroup) return notFound(res, 'Account Group not found');

        await accountGroup.update(validatedData);

        updated(res, accountGroup);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteAccountGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const accountGroup = await AccountGroupMaster.findByPk(id);
        if (!accountGroup) return notFound(res, 'Account Group not found');

        await accountGroup.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};
