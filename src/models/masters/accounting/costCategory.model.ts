import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequalizer";
import { z } from "zod";
import { UserMaster } from "../users/users.model";

const modelName = "CostCategory";

export type CostCategoryTypes = {
    Ca_Id: number;
    Cost_Category: string;
    Category_Alias_name: string;
    ERP_Id: number | null;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
};

type CostCategoryCreationAttributes = Optional<
    CostCategoryTypes,
    "Ca_Id" |"ERP_Id" | "Alter_By" | "Alter_Time"
>;

export class CostCategoryMaster extends Model<
    CostCategoryTypes,
    CostCategoryCreationAttributes
> {}

export const costCategoryCreateSchema = z.object({
    Cost_Category: z
        .string()
        .min(1, "Cost Category is required")
        .max(255, "Cost Category must be at most 255 characters long"),

    Category_Alias_name: z
        .string()
        .min(1, "Category Alias Name is required")
        .max(255, "Category Alias Name must be at most 255 characters long"),

    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Created_By: z.number(),
    Created_Time: z.date(),
});

export const costCategoryUpdateSchema = z.object({
    Cost_Category: z.string().max(255).optional(),
    Category_Alias_name: z.string().max(255).optional(),
    ERP_Id: z.number().optional().nullable(),

    Alter_Id: z.number(),
    Alter_By: z.number(),
    Alter_Time: z.date(),
});

CostCategoryMaster.init(
    {
        Ca_Id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        Cost_Category: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        Category_Alias_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ERP_Id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: sequelize.literal("FLOOR(RANDOM() * 1000000000)"),
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
        tableName: "tbl_Cost_Category_Master",
        modelName: modelName,
        timestamps: false,
        freezeTableName: true,
    }
);

CostCategoryMaster.belongsTo(UserMaster, { foreignKey: "Created_By", targetKey: "id",});
CostCategoryMaster.belongsTo(UserMaster, { foreignKey: "Alter_By", targetKey: "id",});

export const costCategoryAccKey = {
    Ca_Id: `${modelName}.Ca_Id`,
    Cost_Category: `${modelName}.Cost_Category`,
    Category_Alias_name: `${modelName}.Category_Alias_name`,
    ERP_Id: `${modelName}.ERP_Id`,
    Alter_Id: `${modelName}.Alter_Id`,
    Created_By: `${modelName}.Created_By`,
    Created_Time: `${modelName}.Created_Time`,
    Alter_By: `${modelName}.Alter_By`,
    Alter_Time: `${modelName}.Alter_Time`,
};
