import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequalizer';
import { z } from "zod";
import { DistrictMaster } from './district.model';
import { StateMaster } from './state.model';
import { UserMaster } from './users.model';

const modelName = 'BranchMaster';

export interface BranchAttributes {
    BranchId: number;
    BranchCode: string;
    BranchName: string;
    Tele_Code: string | null;
    BranchTel1: string | null;
    Tele1_Code: string | null;
    BranchTel: string | null;
    BranchAddress: string;
    E_Mail: string | null;
    BranchCity: string | null;
    BranchCountry: string | null;
    BranchIncharge: string | null;
    BranchIncMobile: string | null;
    Pin_Code: string | null;
    District: number;
    State: number;
    Entry_By: number;
    Entry_Date: Date;
    Modified_By: number | null;
    Modified_Date: Date | null;
    Del_Flag: number;
    Deleted_By: number | null;
    Deleted_Date: Date | null;
}

type BranchCreationAttributes = Optional<BranchAttributes,
    'BranchId' | 'Tele_Code' | 'BranchTel1' | 'Tele1_Code' | 'BranchTel' | 'E_Mail'
    | 'BranchCity' | 'BranchCountry' | 'BranchIncharge' | 'BranchIncMobile' | 'Pin_Code'
    | 'Modified_Date' | 'Deleted_Date' | 'Modified_By' | 'Deleted_By' | 'Del_Flag'
>

export class BranchMaster
    extends Model<BranchAttributes, BranchCreationAttributes>
    implements BranchAttributes {

    declare BranchId: number;
    declare BranchCode: string;
    declare BranchName: string;
    declare Tele_Code: string | null;
    declare BranchTel1: string | null;
    declare Tele1_Code: string | null;
    declare BranchTel: string | null;
    declare BranchAddress: string;
    declare E_Mail: string | null;
    declare BranchCity: string | null;
    declare BranchCountry: string | null;
    declare BranchIncharge: string | null;
    declare BranchIncMobile: string | null;
    declare Pin_Code: string | null;
    declare District: number;
    declare State: number;
    declare Entry_By: number;
    declare Entry_Date: Date;
    declare Modified_By: number | null;
    declare Modified_Date: Date | null;
    declare Del_Flag: number;
    declare Deleted_By: number | null;
    declare Deleted_Date: Date | null;
}

export const branchCreationSchema = z.object({
    BranchCode: z.string('BranchCode is required'),
    BranchName: z.string('BranchName is required'),
    Tele_Code: z.string().optional().nullable(),
    BranchTel1: z.string().optional().nullable(),
    Tele1_Code: z.string().optional().nullable(),
    BranchTel: z.string().optional().nullable(),
    BranchAddress: z.string('BranchAddress is required'),
    E_Mail: z.string().optional().nullable(),
    BranchCity: z.string().optional().nullable(),
    BranchCountry: z.string().optional().nullable(),
    BranchIncharge: z.string().optional().nullable(),
    BranchIncMobile: z.string().optional().nullable(),
    Pin_Code: z.string('Pin_Code is required').optional().nullable(),
    District: z.number('District is required'),
    State: z.number('State is required'),
    Entry_By: z.number('Entry_By is required'),
    Entry_Date: z.date('Entry_Date is required'),
});

export const branchUpdateSchema = z.object({
    BranchCode: z.string('BranchCode is required'),
    BranchName: z.string('BranchName is required'),
    Tele_Code: z.string().optional().nullable(),
    BranchTel1: z.string().optional().nullable(),
    Tele1_Code: z.string().optional().nullable(),
    BranchTel: z.string().optional().nullable(),
    BranchAddress: z.string('BranchAddress is required'),
    E_Mail: z.string().optional().nullable(),
    BranchCity: z.string().optional().nullable(),
    BranchCountry: z.string().optional().nullable(),
    BranchIncharge: z.string().optional().nullable(),
    BranchIncMobile: z.string().optional().nullable(),
    Pin_Code: z.string('Pin_Code is required').optional().nullable(),
    District: z.number('District id is required'),
    State: z.number('State id is required'),
    Modified_By: z.number('Modified_By is required'),
    Modified_Date: z.date('Modified_Date is required'),
});

export const branchDeleteSchema = z.object({
    Deleted_By: z.number('Deleted_By id is required'),
    Deleted_Date: z.date('Deleted_Date is required'),
});

BranchMaster.init(
    {
        BranchId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        BranchCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        BranchName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        Tele_Code: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BranchTel1: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Tele1_Code: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BranchTel: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BranchAddress: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        E_Mail: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        BranchCity: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BranchCountry: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BranchIncharge: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BranchIncMobile: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Pin_Code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        District: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        State: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Entry_By: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Entry_Date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        Modified_By: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Modified_Date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Del_Flag: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        Deleted_By: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Deleted_Date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'tbl_Branch_Master',
        modelName: modelName,
        timestamps: false,
        freezeTableName: true,
    }
)

BranchMaster.belongsTo(DistrictMaster, { foreignKey: 'District', targetKey: 'District_Id' });
BranchMaster.belongsTo(StateMaster, { foreignKey: 'State', targetKey: 'State_Id' });
BranchMaster.belongsTo(UserMaster, { foreignKey: 'Entry_By', targetKey: 'id' });
BranchMaster.belongsTo(UserMaster, { foreignKey: 'Modified_By', targetKey: 'id' });
BranchMaster.belongsTo(UserMaster, { foreignKey: 'Deleted_By', targetKey: 'id' });

export const branchAccessKey = {
    BranchId: `${modelName}.BranchId`,
    BranchCode: `${modelName}.BranchCode`,
    BranchName: `${modelName}.BranchName`,
    Tele_Code: `${modelName}.Tele_Code`,
    BranchTel1: `${modelName}.BranchTel1`,
    Tele1_Code: `${modelName}.Tele1_Code`,
    BranchTel: `${modelName}.BranchTel`,
    BranchAddress: `${modelName}.BranchAddress`,
    E_Mail: `${modelName}.E_Mail`,
    BranchCity: `${modelName}.BranchCity`,
    BranchCountry: `${modelName}.BranchCountry`,
    BranchIncharge: `${modelName}.BranchIncharge`,
    BranchIncMobile: `${modelName}.BranchIncMobile`,
    Pin_Code: `${modelName}.Pin_Code`,
    District: `${modelName}.District`,
    State: `${modelName}.State`,
    Entry_By: `${modelName}.Entry_By`,
    Entry_Date: `${modelName}.Entry_Date`,
    Modified_By: `${modelName}.Modified_By`,
    Modified_Date: `${modelName}.Modified_Date`,
    Del_Flag: `${modelName}.Del_Flag`,
    Deleted_By: `${modelName}.Deleted_By`,
    Deleted_Date: `${modelName}.Deleted_Date`,
}