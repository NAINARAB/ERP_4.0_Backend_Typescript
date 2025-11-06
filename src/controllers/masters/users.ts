import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../../models/masters/users';

const asInt = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
};

/**
 * GET /api/users
 * Optional query params:
 *   - q: search in Name/UserName
 *   - page (default 1), pageSize (default 25)
 *   - includeDeleted (0/1)
 */
export const listUsers = async (req: Request, res: Response) => {
    try {
        const q = (req.query.q as string)?.trim();
        const page = Math.max(1, Number(req.query.page ?? 1));
        const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize ?? 25)));
        const includeDeleted = Number(req.query.includeDeleted ?? 0) === 1;

        const where: any = {};
        if (!includeDeleted) {
            where[Op.or] = [{ UDel_Flag: 0 }, { UDel_Flag: null }];
        }
        if (q) {
            where[Op.and] = [
                {
                    [Op.or]: [
                        { Name: { [Op.like]: `%${q}%` } },
                        { UserName: { [Op.like]: `%${q}%` } }
                    ]
                }
            ];
        }

        const { rows, count } = await User.findAndCountAll({
            where,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [['UserId', 'DESC']]
        });

        res.json({
            data: rows,
            page,
            pageSize,
            total: count,
            totalPages: Math.ceil(count / pageSize)
        });
    } catch (err) {
        console.error('listUsers error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = asInt(req.params.id);
        if (!Number.isFinite(id)) return res.status(400).json({ message: 'Invalid id' });

        const user = await User.findOne({
            where: {
                UserId: id,
                [Op.or]: [{ UDel_Flag: 0 }, { UDel_Flag: null }]
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('getUser error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { Global_User_ID, UserTypeId, Name, UserName, Password, BranchId } = req.body;

        if (!UserName || !Password) {
            return res.status(400).json({ message: 'UserName and Password are required' });
        }

        // NOTE: If you want hashing, plug bcrypt here before save.
        // const hash = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            Global_User_ID: Global_User_ID ?? null,
            UserTypeId: UserTypeId ?? null,
            Name: Name ?? null,
            UserName,
            Password, // replace with 'hash' if hashing
            BranchId: BranchId ?? null,
            UDel_Flag: 0
        });

        res.status(201).json(newUser);
    } catch (err: any) {
        console.error('createUser error:', err);
        if (err?.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'UserName already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = asInt(req.params.id);
        if (!Number.isFinite(id)) return res.status(400).json({ message: 'Invalid id' });

        const user = await User.findByPk(id);
        if (!user || user.UDel_Flag === 1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { Global_User_ID, UserTypeId, Name, UserName, Password, BranchId } = req.body;

        await user.update({
            Global_User_ID: Global_User_ID ?? user.Global_User_ID,
            UserTypeId: UserTypeId ?? user.UserTypeId,
            Name: Name ?? user.Name,
            UserName: UserName ?? user.UserName,
            BranchId: BranchId ?? user.BranchId
        });

        res.json(user);
    } catch (err: any) {
        console.error('updateUser error:', err);
        if (err?.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'UserName already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const softDeleteUser = async (req: Request, res: Response) => {
    try {
        const id = asInt(req.params.id);
        if (!Number.isFinite(id)) return res.status(400).json({ message: 'Invalid id' });

        const user = await User.findByPk(id);
        if (!user || user.UDel_Flag === 1) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ UDel_Flag: 1 });
        res.json({ message: 'User soft-deleted' });
    } catch (err) {
        console.error('softDeleteUser error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// export const hardDeleteUser = async (req: Request, res: Response) => {
//     try {
//         const id = asInt(req.params.id);
//         if (!Number.isFinite(id)) return res.status(400).json({ message: 'Invalid id' });
//         const deleted = await User.destroy({ where: { UserId: id } });
//         if (!deleted) return res.status(404).json({ message: 'User not found' });
//         res.json({ message: 'User hard-deleted' });
//     } catch (err) {
//         console.error('hardDeleteUser error:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
