import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequalizer';
import { z } from "zod";
import { StateMaster } from './state.model';

const modelName = 'DistrictMaster';

export interface Districttributes {
    District_Id: number;
    District_Name: string;
    State_Id: number;
}

export type DistrictCreationAttributes = Optional<Districttributes, "District_Id">

export class DistrictMaster extends Model<Districttributes, DistrictCreationAttributes> { }

export const districtSchema = z.object({
    District_Name: z.string().min(1, "District_Name is required").max(150, 'District_Name must be at most 150 characters'),
    State_Id: z.number('State_Id is required').int(),
});

DistrictMaster.init({
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
    modelName: modelName,
    timestamps: false,
    freezeTableName: true
});

DistrictMaster.belongsTo(StateMaster, { foreignKey: 'State_Id', targetKey: 'State_Id' });

export const districtAccKey = {
    District_Id: `${modelName}.District_Id`,
    District_Name: `${modelName}.District_Name`,
    State_Id: `${modelName}.State_Id`,
}
