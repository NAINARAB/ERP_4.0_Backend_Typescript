import { Request, Response } from "express";
import { RetailerMaster, retailerCreateSchema, retailerUpdateSchema } from "../../../models/masters/users/retailer.model";
import { AreaMaster, areaAccKey } from "../../../models/masters/users/area.model";
import { DistrictMaster, districtAccKey } from "../../../models/masters/users/district.model";
import { StateMaster, stateAccKey } from "../../../models/masters/users/state.model";
import { RouteMaster, routeAccKey } from "../../../models/masters/users/route.model";
import { BranchMaster, branchAccessKey } from "../../../models/masters/users/branch.model";
import path from "path";
import { sentData, servError, invalidInput, notFound, created, updated, deleted } from '../../../responseObject';
import { validateBody } from "../../../middleware/zodValidator";
import { isNumber, randomNumber } from "../../../middleware/helper";
import { Sequelize } from "sequelize";

function buildImageColumns(file?: Express.Multer.File) {
    if (!file) return { ImageName: null, ImagePath: null, ImageType: null };
    return {
        ImageName: file.filename,
        ImagePath: path.posix.join("uploads", "retailers", file.filename),
        ImageType: file.mimetype
    };
}

export const getRetailers = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await RetailerMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["Retailer_Name", "ASC"]],
                include: [
                    { model: AreaMaster, attributes: [] },
                    { model: DistrictMaster, attributes: [] },
                    { model: StateMaster, attributes: [] },
                    { model: RouteMaster, attributes: [] },
                    { model: BranchMaster, attributes: [] },
                ],
                attributes: {
                    include: [
                        [Sequelize.col(areaAccKey.Area_Name), 'areaGet'],
                        [Sequelize.col(districtAccKey.District_Name), 'districtGet'],
                        [Sequelize.col(stateAccKey.State_Name), 'stateGet'],
                        [Sequelize.col(routeAccKey.Route_Name), 'routeGet'],
                        [Sequelize.col(branchAccessKey.BranchName), 'branchGet'],
                    ]
                }
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await RetailerMaster.findAll({
            where,
            order: [["Retailer_Name", "ASC"]],
            include: [
                { model: AreaMaster, attributes: [] },
                { model: DistrictMaster, attributes: [] },
                { model: StateMaster, attributes: [] },
                { model: RouteMaster, attributes: [] },
                { model: BranchMaster, attributes: [] },
            ],
            attributes: {
                include: [
                    [Sequelize.col(areaAccKey.Area_Name), 'areaGet'],
                    [Sequelize.col(districtAccKey.District_Name), 'districtGet'],
                    [Sequelize.col(stateAccKey.State_Name), 'stateGet'],
                    [Sequelize.col(routeAccKey.Route_Name), 'routeGet'],
                    [Sequelize.col(branchAccessKey.BranchName), 'branchGet'],
                ]
            }
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getRetailerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const retailer = await RetailerMaster.findByPk(id, {
            include: [
                { model: AreaMaster, attributes: [] },
                { model: DistrictMaster, attributes: [] },
                { model: StateMaster, attributes: [] },
                { model: RouteMaster, attributes: [] },
                { model: BranchMaster, attributes: [] },
            ],
            attributes: {
                include: [
                    [Sequelize.col(areaAccKey.Area_Name), 'areaGet'],
                    [Sequelize.col(districtAccKey.District_Name), 'districtGet'],
                    [Sequelize.col(stateAccKey.State_Name), 'stateGet'],
                    [Sequelize.col(routeAccKey.Route_Name), 'routeGet'],
                    [Sequelize.col(branchAccessKey.BranchName), 'branchGet'],
                ]
            }
        });
        if (!retailer) return notFound(res, 'Retailer not found');

        sentData(res, [retailer]);
    } catch (e) {
        servError(e, res);
    }
};

export const createRetailer = async (req: Request, res: Response) => {
    try {
        const imageCols = req.file ? buildImageColumns(req.file) : {};

        const validatedBody = validateBody(
            retailerCreateSchema,
            {
                ...req.body,
                ...imageCols,
                Alter_Id: randomNumber(),
                Created_Date: new Date(),
            },
            res
        );
        if (!validatedBody) return;

        const newRetailer = await RetailerMaster.create(validatedBody);

        created(res, newRetailer);
    } catch (e) {
        servError(e, res);
    }
};

export const updateRetailer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const imageCols = req.file ? buildImageColumns(req.file) : {};

        const validatedBody = validateBody(
            retailerUpdateSchema,
            {
                ...req.body,
                ...imageCols,
                Updated_Date: new Date(),
                Alter_Id: randomNumber(),
            },
            res
        );
        if (!validatedBody) return;

        const retailer = await RetailerMaster.findByPk(id);
        if (!retailer) return notFound(res, 'Retailer not found');

        await retailer.update(validatedBody);

        updated(res, retailer);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteRetailer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const retailer = await RetailerMaster.findByPk(id);
        if (!retailer) return notFound(res, 'Retailer not found');

        await retailer.destroy();
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};

export const softDeleteRetailer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const retailer = await RetailerMaster.findByPk(id);
        if (!retailer) return notFound(res, 'Retailer not found');

        await retailer.update({ Del_Flag: 1 });
        updated(res, retailer);

    } catch (e) {
        servError(e, res);
    }
}
