import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequalizer";
import { z } from "zod";
import { UserMaster } from "../users/users.model";
import { CostCategoryMaster } from "./costCategory.model";

const modelName = "CostCenter";

export type CostCenterTypes = {
    CO_Id: number;
    Cost_Center: string;
    Cost_Alias_name: string;
    ERP_Cost_Center_Id: number;
    ERP_Id: number | null;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
};

type CostCenterCreationAttributes = Optional<
    CostCenterTypes,
    "CO_Id" |"ERP_Id" | "Alter_By" | "Alter_Time"
>;

export class CostCenterMaster extends Model<
    CostCenterTypes,
    CostCenterCreationAttributes
> {}

export const costCenterCreateSchema = z.object({
    Cost_Center: z
        .string()
        .min(1, "Cost Center is required")
        .max(255, "Cost Center must be at most 255 characters long"),

    Cost_Alias_name: z
        .string()
        .min(1, "Cost Alias Name is required")
        .max(255, "Cost Alias Name must be at most 255 characters long"),

    ERP_Cost_Center_Id: z.number(),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Created_By: z.number(),
    Created_Time: z.date(),
});

export const costCenterUpdateSchema = z.object({
    Cost_Center: z.string().max(255).optional(),
    Cost_Alias_name: z.string().max(255).optional(),
    ERP_Cost_Center_Id: z.number().optional(),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Alter_By: z.number(),
    Alter_Time: z.date(),
});

CostCenterMaster.init(
    {
        CO_Id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        Cost_Center: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        Cost_Alias_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ERP_Cost_Center_Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        ERP_Id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: sequelize.literal("FLOOR(RANDOM() * 10000000)"),
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Created_Time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        Alter_By: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Alter_Time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "tbl_Cost_Center_Master",
        modelName: modelName,
        timestamps: false,
        freezeTableName: true,
    }
);

CostCenterMaster.belongsTo(CostCategoryMaster, { foreignKey: "ERP_Cost_Center_Id", targetKey: "Ca_Id" })
CostCenterMaster.belongsTo(UserMaster, { foreignKey: "Created_By", targetKey: "id" });
CostCenterMaster.belongsTo(UserMaster, { foreignKey: "Alter_By", targetKey: "id" });

export const costCenterAccKey = {
    CO_Id: `${modelName}.CO_Id`,
    Cost_Center: `${modelName}.Cost_Center`,
    Cost_Alias_name: `${modelName}.Cost_Alias_name`,
    ERP_Cost_Center_Id: `${modelName}.ERP_Cost_Center_Id`,
    ERP_Id: `${modelName}.ERP_Id`,
    Alter_Id: `${modelName}.Alter_Id`,
    Created_By: `${modelName}.Created_By`,
    Created_Time: `${modelName}.Created_Time`,
    Alter_By: `${modelName}.Alter_By`,
    Alter_Time: `${modelName}.Alter_Time`,
};
