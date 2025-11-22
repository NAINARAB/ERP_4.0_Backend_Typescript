import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';
import { z } from "zod";

export interface Districttributes {
    District_Id: number;
    District_Name: string;
    State_Id: number;
}

export type DistrictCreationAttributes = Optional<Districttributes, "District_Id">

export class DistrinctMaster extends Model<Districttributes, DistrictCreationAttributes> {}

export const districtSchema = z.object({
    District_Name: z.string().min(1, "District_Name is required").max(150, 'District_Name must be at most 150 characters'),
    State_Id: z.number('State_Id is required').int(),
});

DistrinctMaster.init({
    District_Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    District_Name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    State_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'tbl_Distict_Master',
    modelName: 'DistrinctMaster',
    timestamps: false,
    freezeTableName: true
});
