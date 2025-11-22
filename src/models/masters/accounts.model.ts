import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';
import { z } from "zod";
import { randomNumber } from '../../middleware/helper';

export type AccountMasterTypes = {
    Acc_Id: number;
    Account_name: string;
    Account_Alias_name: string;
    Group_Id: number | null;
    ERP_Id: number | null;
    Alter_Id: number | null;
    Created_By: number | null;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date;
};

type AccountMasterTypesCreationAttributes = Optional<AccountMasterTypes, 'Acc_Id' | 'Account_Alias_name' | 'ERP_Id' | 'Created_Time' | 'Alter_Id' | 'Alter_By' | 'Alter_Time'>;

export class AccountMaster extends Model<AccountMasterTypes, AccountMasterTypesCreationAttributes> {}

export const accountCreateSchema = z.object({
    Account_name: z.string().min(1, 'Account name is required'),
    Account_Alias_name: z.string().optional(),
    Group_Id: z.number('Group_Id is required'),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Created_By: z.number(),
});

export const accountUpdateSchema = z.object({
    Account_name: z.string().min(1, 'Account name is required').optional(),
    Account_Alias_name: z.string().optional(),
    Group_Id: z.number().optional(),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Alter_By: z.number(),
});

AccountMaster.init(
    {
        Acc_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Account_name: {
            type: DataTypes.STRING(350),
            allowNull: false
        },
        Account_Alias_name: {
            type: DataTypes.STRING(350),
            allowNull: false
        },
        Group_Id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ERP_Id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Alter_Id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: randomNumber()
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Created_Time: {
            type: DataTypes.DATE,
            allowNull: false,
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
        tableName: 'tbl_Account_Master',
        modelName: 'AccountMaster',
        timestamps: false,
        freezeTableName: true
    }
)