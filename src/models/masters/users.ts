import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';
import { z } from "zod";

export interface UserAttributes {
    id: number;
    userType: number;
    name: string;
    uniqueName: string;
    password: string;
    branchId: number;
    isActive?: number | null;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'isActive'>;

export class UserMaster extends Model<UserAttributes, UserCreationAttributes> {}

export const userCreateSchema = z.object({
    userType: z.number(),
    name: z.string().min(1),
    uniqueName: z.string().min(1),
    password: z.string().min(6, "Password should be minimum 6 chars"),
    branchId: z.number(),
    isActive: z.number().nullable().optional(),
});

export const userUpdateSchema = z.object({
    userType: z.number().optional(),
    name: z.string().min(1).optional(),
    uniqueName: z.string().min(1).optional(),
    branchId: z.number().optional(),
    isActive: z.number().nullable().optional(),
    password: z.never().optional(),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(6),
});

UserMaster.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        userType: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        uniqueName: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        branchId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: 'tbl_Users',
        timestamps: false,
        freezeTableName: true,
    }
);