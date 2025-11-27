import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequalizer';
import { z } from "zod";
import { UserMaster } from '../users/users.model';
import { AccountGroupMaster } from './accountGroup.model';

const modelName = 'AccountMaster';

export type AccountMasterTypes = {
    Acc_Id: number;
    Account_name: string;
    Account_Alias_name: string | null;
    Group_Id: number;
    ERP_Id: number | null;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
};

type AccountMasterTypesCreationAttributes = Optional<
    AccountMasterTypes, 
    'Acc_Id' | 'Account_Alias_name' | 'ERP_Id' | 'Created_Time' 
    | 'Alter_Id' | 'Alter_By' | 'Alter_Time'
>;

export class AccountMaster extends Model<AccountMasterTypes, AccountMasterTypesCreationAttributes> { }

export const accountCreateSchema = z.object({
    Account_name: z.string().min(1, 'Account name is required'),
    Account_Alias_name: z.string().optional(),
    Group_Id: z.number('Group_Id is required'),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number('Alter_Id is required'),
    Created_By: z.number('Created_By is required'),
});

export const accountUpdateSchema = z.object({
    Account_name: z.string().min(1, 'Account name is required').optional(),
    Account_Alias_name: z.string().optional(),
    Group_Id: z.number().optional(),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number('Alter_Id is required'),
    Alter_By: z.number('Alter_By is required'),
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
            allowNull: false,
            unique: true,
        },
        Account_Alias_name: {
            type: DataTypes.STRING(350),
            allowNull: true
        },
        Group_Id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ERP_Id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Alter_Id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: sequelize.literal("FLOOR(RANDOM() * 1000000000)")
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
        modelName: modelName,
        timestamps: false,
        freezeTableName: true
    }
)

AccountMaster.belongsTo(AccountGroupMaster, { foreignKey: 'Group_Id', targetKey: 'Group_Id' });
AccountMaster.belongsTo(UserMaster, { foreignKey: 'Created_By', targetKey: 'id' });
AccountMaster.belongsTo(UserMaster, { foreignKey: 'Alter_By', targetKey: 'id' });

export const accountAccKey = {
    Acc_Id: `${modelName}.Acc_Id`,
    Account_name: `${modelName}.Account_name`,
    Account_Alias_name: `${modelName}.Account_Alias_name`,
    Group_Id: `${modelName}.Group_Id`,
    Alter_Id: `${modelName}.Alter_Id`,
    Created_By: `${modelName}.Created_By`,
    Created_At: `${modelName}.Created_At`,
    Alter_By: `${modelName}.Alter_By`,
    Alter_At: `${modelName}.Alter_At`,
}
