import { Request, Response } from 'express';
import { created, updated, deleted, servError, notFound, invalidInput, sentData } from '../../../responseObject';
import { validateBody } from '../../../middleware/zodValidator';
import { BranchMaster, branchCreationSchema, branchDeleteSchema, branchUpdateSchema } from '../../../models/masters/users/branch.model';
import { isNumber } from '../../../middleware/helper';
import { stateAccKey, StateMaster } from '../../../models/masters/users/state.model';
import { districtAccKey, DistrictMaster } from '../../../models/masters/users/district.model';
import { Sequelize } from 'sequelize';


export const getAllBranches = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await BranchMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [["BranchName", "ASC"]],
                include: [
                    { model: StateMaster, attributes: [] },
                    { model: DistrictMaster, attributes: [] }
                ],
                attributes: {
                    include: [
                        [Sequelize.col(stateAccKey.State_Name), 'stateGet'],
                        [Sequelize.col(districtAccKey.District_Name), 'districtGet'],
                    ]
                }
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await BranchMaster.findAll({
            where,
            order: [["BranchName", "ASC"]],
            include: [
                { model: StateMaster, attributes: [] },
                { model: DistrictMaster, attributes: [] }
            ],
            attributes: {
                include: [
                    [Sequelize.col(stateAccKey.State_Name), 'stateGet'],
                    [Sequelize.col(districtAccKey.District_Name), 'districtGet'],
                ]
            }
        });

        sentData(res, data);
    } catch (err) {
        servError(err, res);
    }
};

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const branch = await BranchMaster.findByPk(id, {
            include: [
                { model: StateMaster, attributes: [] },
                { model: DistrictMaster, attributes: [] }
            ],
            attributes: {
                include: [
                    [Sequelize.col(stateAccKey.State_Name), 'stateGet'],
                    [Sequelize.col(districtAccKey.District_Name), 'districtGet'],
                ]
            }
        });
        if (!branch) return notFound(res, 'Branch not found');

        return sentData(res, [branch]);
    } catch (error) {
        return servError(error, res);
    }
};

export const createBranch = async (req: Request, res: Response) => {
    try {
        const validatedBody = validateBody(branchCreationSchema, {
            ...req.body,
            Entry_Date: new Date(),
        }, res);
        if (!validatedBody) return;

        const branch = await BranchMaster.create({ ...validatedBody, Del_Flag: 0 });
        return created(res, branch);
    } catch (e) {
        return servError(e, res);
    }
};

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');

        const validatedBody = validateBody(branchUpdateSchema, {
            ...req.body, Modified_Date: new Date()
        }, res);
        if (!validatedBody) return;

        const branch = await BranchMaster.findByPk(id);
        if (!branch) return notFound(res, 'Branch not found');

        await branch.update(validatedBody);
        return updated(res, [branch]);
    } catch (error) {
        return servError(error, res);
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return invalidInput(res, 'id parameter is required');
        
        const branch = await BranchMaster.findByPk(id);
        if (!branch) return notFound(res, 'Branch not found');

        const validatedBody = validateBody(branchDeleteSchema, {
            ...req.body, Deleted_Date: new Date()
        }, res);
        if (!validatedBody) return;

        await branch.update({ Del_Flag: 1, ...validatedBody });
        deleted(res, 'Branch deleted successfully');
    } catch (error) {
        servError(error, res);
    }
};
