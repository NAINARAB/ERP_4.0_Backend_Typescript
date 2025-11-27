import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequalizer';
import { z } from "zod";

const modelName = 'AreaMaster';

export interface AreaAttributes {
    Area_Id: number;
    Area_Name: string;
    District_Id: number;
}

export type AreaCreationAttributes = Optional<AreaAttributes, "Area_Id">

export class AreaMaster extends Model<AreaAttributes, AreaCreationAttributes> { }

export const areaSchema = z.object({
    Area_Name: z.string().min(1, "Area_Name is required").max(250, 'Area_Name must be at most 250 characters'),
    District_Id: z.number('District_Id is required').int(),
});

AreaMaster.init({
    Area_Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    Area_Name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    District_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'tbl_Area_Master',
    modelName: modelName,
    timestamps: false,
    freezeTableName: true
});

export const areaAccKey = {
    Area_Id: `${modelName}.Area_Id`,
    Area_Name: `${modelName}.Area_Name`,
    District_Id: `${modelName}.District_Id`,
}
