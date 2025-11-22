import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';
import { z } from "zod";

export interface PackAttributes {
    Pack_Id: number;
    Pack: string;
}

export type PackCreationAttributes = Optional<PackAttributes, "Pack_Id">

export class PackMaster extends Model<PackAttributes, PackCreationAttributes> {}

export const packCreateSchema = z.object({
    Pack: z.string().min(1, "Pack name is required").max(50, 'Pack name must be at most 50 characters'),
});

PackMaster.init({
    Pack_Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    Pack: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'tbl_Pack_Master',
    modelName: 'Pack',
    timestamps: false,
    freezeTableName: true
});
