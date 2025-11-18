import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';
import { z } from "zod";

export interface BrandAttributes {
    Brand_Id: number;
    Brand_Name: string;
    Pro_T_Id: number;
    Created_at: Date;
    Created_By: number;
    Alter_Id?: number | null;
    Alter_at?: Date | null;
    Alter_By?: number | null;
}

type BrandCreationAttributes = Optional<BrandAttributes, 'Brand_Id' | 'Alter_Id' | 'Alter_at' | 'Alter_By'>;

export class BrandMaster extends Model<BrandAttributes, BrandCreationAttributes> {}

export const brandCreateSchema = z.object({
    Brand_Name: z.string().min(1).max(150),
    Pro_T_Id: z.number(),
    Created_at: z.date(),
    Created_By: z.number(),
    Alter_Id: z.number().nullable().optional(),
    Alter_at: z.date().nullable().optional(),
    Alter_By: z.number().nullable().optional(),
});

export const brandUpdateSchema = z.object({
    Brand_Name: z.string().min(1).max(150).optional(),
    Pro_T_Id: z.number().optional(),
    Created_at: z.date().optional(),
    Created_By: z.number().optional(),
    Alter_Id: z.number().nullable().optional(),
    Alter_at: z.date().nullable().optional(),
    Alter_By: z.number().nullable().optional(),
});

BrandMaster.init(
    {
        Brand_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Brand_Name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        Pro_T_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        Alter_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Alter_By: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'tbl_Brand_Master',
        timestamps: false,
        freezeTableName: true
    }
)