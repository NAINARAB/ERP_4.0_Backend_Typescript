import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequalizer';
import { z } from "zod";

const modelName = 'BrandMaster';

export interface BrandAttributes {
    Brand_Id: number;
    Brand_Name: string;
    Pro_T_Id: number;
    Created_By: number;
    Created_at?: Date;
    Alter_Id?: number | null;
    Alter_at?: Date | null;
    Alter_By?: number | null;
}

type BrandCreationAttributes = Optional<BrandAttributes, 'Brand_Id' | 'Created_at' | 'Alter_Id' | 'Alter_at' | 'Alter_By'>;

export class BrandMaster extends Model<BrandAttributes, BrandCreationAttributes> { }

export const brandCreateSchema = z.object({
    Brand_Name: z.string().min(1, "Brand name is required").max(150, 'Brand name must be at most 150 characters'),
    Pro_T_Id: z.number('Pro_T_Id is required'),
    Created_By: z.number('Created_By is required'),
    Created_at: z.date().optional(),
    Alter_Id: z.number('Alter_Id is required'),
});

export const brandUpdateSchema = z.object({
    Brand_Name: z.string().min(1, "Brand name is required").max(150, 'Brand name must be at most 150 characters'),
    Pro_T_Id: z.number().optional(),
    Alter_Id: z.number('Alter_Id is required'),
    Alter_at: z.date(),
    Alter_By: z.number('Alter_By is required'),
});

BrandMaster.init(
    {
        Brand_Id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        Brand_Name: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        Pro_T_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
    modelName: modelName,
    timestamps: false,
    freezeTableName: true,
}
)

export const brandAccKey = {
    Brand_Id: `${modelName}.Brand_Id`,
    Brand_Name: `${modelName}.Brand_Name`,
    Pro_T_Id: `${modelName}.Pro_T_Id`,
    Created_at: `${modelName}.Created_at`,
    Created_By: `${modelName}.Created_By`,
    Alter_Id: `${modelName}.Alter_Id`,
    Alter_at: `${modelName}.Alter_at`,
    Alter_By: `${modelName}.Alter_By`,
}