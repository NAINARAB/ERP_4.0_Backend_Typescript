import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequalizer';
import { z } from "zod";

const modelName = 'StateMaster';

export interface StateAttributes {
    State_Id: number;
    State_Name: string;
}

export type StateCreationAttributes = Optional<StateAttributes, "State_Id">

export class StateMaster extends Model<StateAttributes, StateCreationAttributes> { }

export const stateSchema = z.object({
    State_Name: z.string().min(1, "State_Name is required").max(50, 'State_Name must be at most 50 characters'),
});

StateMaster.init({
    State_Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    State_Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'tbl_State_Master',
    modelName: modelName,
    timestamps: false,
    freezeTableName: true
});

export const stateAccKey = {
    State_Id: `${modelName}.State_Id`,
    State_Name: `${modelName}.State_Name`,
}
