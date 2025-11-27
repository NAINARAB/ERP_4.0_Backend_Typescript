import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequalizer';
import { z } from "zod";
import { UserMaster } from '../users/users.model'
import { BranchMaster } from '../users/branch.model'

const modelName = 'VoucherType';

export type VoucherTypeTypes = {
    Voucher_Type_Id: number;
    Voucher_Type: string;
    Voucher_Code: string;
    Branch_Id: number;
    Type: string;
    Tally_Id: number | null;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
    tally_sync: number | null;
};

type VoucherTypeCreationAttributes = Optional<VoucherTypeTypes, 'Voucher_Type_Id' | 'Tally_Id' | 'Alter_By' | 'Alter_Time' | 'tally_sync'>;

export class VoucherTypeMaster extends Model<VoucherTypeTypes, VoucherTypeCreationAttributes> { }

export const voucherTypeCreateSchema = z.object({
    Voucher_Type: z.string().min(4, 'Voucher type must be at least 4 characters long').max(150, 'Voucher type must be at most 150 characters long'),
    Voucher_Code: z.string().max(50, 'Voucher code must be at most 50 characters long'),
    Branch_Id: z.number('Branch_Id is required'),
    Type: z.string().max(20, 'Type must be at most 20 characters long'),
    Tally_Id: z.number().optional().nullable(),
    Alter_Id: z.number('Alter_Id is required'),
    Created_By: z.number('Created_By is required'),
    Created_Time: z.date('Created_Time is required'),
});

export const voucherTypeUpdateSchema = z.object({
    Voucher_Type: z.string().min(4, 'Voucher type must be at least 4 characters long').max(150, 'Voucher type must be at most 150 characters long').optional(),
    Voucher_Code: z.string().max(50, 'Voucher code must be at most 50 characters long').optional(),
    Branch_Id: z.number('Branch_Id is required').optional(),
    Type: z.string().max(20, 'Type must be at most 20 characters long').optional(),
    Tally_Id: z.number().optional().nullable(),
    Alter_Id: z.number('Alter_Id is required'),
    Alter_By: z.number('Alter_By is required'),
    Alter_Time: z.date('Alter_Time is required'),
});

VoucherTypeMaster.init(
    {
        Voucher_Type_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Voucher_Type: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        Voucher_Code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        Branch_Id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Type: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Tally_Id: {
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
        },
        tally_sync: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'tbl_Voucher_Type',
        modelName: modelName,
        timestamps: false,
        freezeTableName: true
    }
)

VoucherTypeMaster.belongsTo(BranchMaster, { foreignKey: 'Branch_Id', targetKey: 'BranchId' });
VoucherTypeMaster.belongsTo(UserMaster, { foreignKey: 'Created_By', targetKey: 'id' });
VoucherTypeMaster.belongsTo(UserMaster, { foreignKey: 'Alter_By', targetKey: 'id' });

export const voucherAccKey = {
    Voucher_Type_Id: `${modelName}.Voucher_Type_Id`,
    Voucher_Type: `${modelName}.Voucher_Type`,
    Voucher_Code: `${modelName}.Voucher_Code`,
    Branch_Id: `${modelName}.Branch_Id`,
    Type: `${modelName}.Type`,
    Tally_Id: `${modelName}.Tally_Id`,
    Alter_Id: `${modelName}.Alter_Id`,
    Created_By: `${modelName}.Created_By`,
    Created_Time: `${modelName}.Created_Time`,
    Alter_By: `${modelName}.Alter_By`,
    Alter_Time: `${modelName}.Alter_Time`,
    tally_sync: `${modelName}.tally_sync`
}
