import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";

export interface PaginationData {
    page: number;
    limit: number;
    offset: number;
    paginate: boolean;
    search: string;
    where: any;
}

export const paginationData = (
    searchFields: string[] = []
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const search = req.query.search?.toString() || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const paginate = String(req.query.paginate || "false") === "true";
        const offset = (page - 1) * limit;

        let where: any = {};

        if (search && searchFields.length > 0) {
            where = {
                [Op.or]: searchFields.map((field) => ({
                    [field]: { [Op.like]: `%${search}%` },
                })),
            };
        }

        (req as any).pagination = {
            page,
            limit,
            offset,
            paginate,
            search,
            where
        } as PaginationData;

        next();
    };
};
