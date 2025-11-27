import { Request, Response } from 'express';
import { created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { VoucherTypeMaster, voucherTypeCreateSchema, voucherTypeUpdateSchema } from '../../../models/masters/accounting/voucher.model';
import { isNumber, randomNumber } from '../../../middleware/helper';

export const getVouchers = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;
        if (paginate) {
            const { rows, count } = await VoucherTypeMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Voucher_Type", "ASC"]],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await VoucherTypeMaster.findAll({
            where,
            order: [["Voucher_Type", "ASC"]],
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getVoucherById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const voucher = await VoucherTypeMaster.findByPk(id);
        if (!voucher) return notFound(res, 'Voucher not found');

        sentData(res, [voucher]);
    } catch (e) {
        servError(e, res);
    }
};

export const createVoucher = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(
            voucherTypeCreateSchema,
            { ...req.body, Alter_Id: randomNumber(), Created_Time: new Date() },
            res
        );
        if (!validatedBody) return;

        const newVoucher = await VoucherTypeMaster.create(validatedBody);

        created(res, newVoucher);
    } catch (e) {
        servError(e, res);
    }
};

export const updateVoucher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(
            voucherTypeUpdateSchema,
            { ...req.body, Alter_Time: new Date(), Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const voucher = await VoucherTypeMaster.findByPk(id);
        if (!voucher) return notFound(res, 'Voucher not found');

        await voucher.update(validatedBody);

        updated(res, voucher);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteVoucher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const voucher = await VoucherTypeMaster.findByPk(id);
        if (!voucher) return notFound(res, 'Voucher not found');

        await voucher.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};
