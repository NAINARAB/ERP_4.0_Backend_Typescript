import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer'; // adjust path
import { randomNumber } from '../../middleware/helper';
import { z } from "zod";

export type UnitMasterTypes = {
    Unit_Id: number;
    Units: string;
    ERP_Id: number | null;
    Alter_Id: number | null;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
};

type UnitMasterCreationAttributes = Optional<
    UnitMasterTypes,
    'Unit_Id' | 'ERP_Id' | 'Alter_Id' |'Created_Time' | 'Alter_By' | 'Alter_Time'
>;

export class UnitMaster extends Model<UnitMasterTypes, UnitMasterCreationAttributes>{}

export const UnitCreateSchema = z.object({
    Units: z.string().min(1, 'Unit name is required'),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Created_By: z.number(),
});

export const UnitUpdateSchema = z.object({
    Units: z.string().min(1, 'Unit name is required'),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Alter_By: z.number(),
});

UnitMaster.init(
    {
        Unit_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Units: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        ERP_Id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: randomNumber()
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Created_Time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        Alter_By: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Alter_Time: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'tbl_UOM',
        modelName: 'UnitMaster',
        timestamps: false,
        freezeTableName: true
    }
);
