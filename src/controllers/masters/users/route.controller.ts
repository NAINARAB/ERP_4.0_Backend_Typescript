import { Request, Response } from 'express';
import { dataFound, created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { RouteMaster, routeSchema } from '../../../models/masters/users/route.model';
import { isNumber, randomNumber } from '../../../middleware/helper';

export const getRoutes = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;
        if (paginate) {
            const { rows, count } = await RouteMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Route_Name", "ASC"]],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await RouteMaster.findAll({
            where,
            order: [["Route_Name", "ASC"]],
        });

        dataFound(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getRouteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const route = await RouteMaster.findByPk(id);
        if (!route) return notFound(res, 'Route not found');

        sentData(res, [route]);
    } catch (e) {
        servError(e, res);
    }
};

export const createRoute = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(
            routeSchema,
            { ...req.body, Alter_Id: randomNumber() },
            res
        );
        if (!validatedBody) return;

        const newRoute = await RouteMaster.create(validatedBody);

        created(res, newRoute);
    } catch (e) {
        servError(e, res);
    }
};

export const updateRoute = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(
            routeSchema,
            { ...req.body, Alter_Id: randomNumber(), Alter_Time: new Date() },
            res
        );
        if (!validatedBody) return;

        const route = await RouteMaster.findByPk(id);
        if (!route) return notFound(res, 'Route not found');

        await route.update(validatedBody);

        updated(res, route);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteRoute = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const route = await RouteMaster.findByPk(id);
        if (!route) return notFound(res, 'Route not found');

        await route.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};