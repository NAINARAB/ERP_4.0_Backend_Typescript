import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';
import { z } from "zod";

export interface ProductGroupAttributes {
    Pro_Group_Id: number;
    Pro_Group: string;
    Alter_Id: number;
    Created_By: number;
    Created_At?: Date;
    Alter_By?: number | null;
    Alter_At?: Date | null;
}

type ProductGroupCreationAttributes = Optional<ProductGroupAttributes, 'Pro_Group_Id' | 'Created_At' | 'Alter_By' | 'Alter_At'>;

export class ProductGroupMaster extends Model<ProductGroupAttributes, ProductGroupCreationAttributes> {}

export const productGroupCreateSchema = z.object({
    Pro_Group: z.string().min(1, "Product group name is required").max(150, 'Product group name must be at most 150 characters'),
    Created_By: z.number('Created_By is required'),
    Created_At: z.date().optional(),
    Alter_Id: z.number('Alter_Id is required'),
});

export const productGroupUpdateSchema = z.object({
    Pro_Group: z.string().min(1, "Product group name is required").max(150, 'Product group name must be at most 150 characters'),
    Alter_Id: z.number(),
    Alter_At: z.date(),
    Alter_By: z.number('Alter_By is required'),
});

ProductGroupMaster.init(
    {
        Pro_Group_Id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        Pro_Group: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Created_At: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        Alter_By: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Alter_At: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'tbl_Product_Group',
        modelName: 'ProductGroupMaster',
        timestamps: false,
        freezeTableName: true,
    }
);