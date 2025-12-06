import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequalizer";
import { z } from "zod";
import { UserMaster } from "../users/users.model";

const modelName = "AccountGroup";

export type AccountGroupTypes = {
    Group_Id: number;
    Group_Name: string;
    Alias_name: string | null;
    Parent_AC_id: number | null;
    ERP_Id: number | null;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
};

type AccountGroupCreationAttributes = Optional<
    AccountGroupTypes,
    "Group_Id" | "Alias_name" | "Parent_AC_id" | "ERP_Id" | "Alter_By" | "Alter_Time"
>;

export class AccountGroupMaster extends Model<
    AccountGroupTypes,
    AccountGroupCreationAttributes
> { }

export const accountGroupCreateSchema = z.object({
    Group_Name: z
        .string()
        .min(1, "Group Name is required")
        .max(255, "Group Name cannot exceed 255 characters"),

    Alias_name: z.string().max(255).optional().nullable(),
    Parent_AC_id: z.number().optional().nullable(),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Created_By: z.number(),
    Created_Time: z.date(),
});

export const accountGroupUpdateSchema = z.object({
    Group_Name: z.string().max(255).optional(),
    Alias_name: z.string().max(255).optional().nullable(),
    Parent_AC_id: z.number().optional().nullable(),
    ERP_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Alter_By: z.number(),
    Alter_Time: z.date(),
});

AccountGroupMaster.init(
    {
        Group_Id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        Group_Name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        Alias_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        Parent_AC_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        ERP_Id: {
            type: DataTypes.INTEGER,
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
        tableName: "tbl_Accounting_Group",
        modelName: modelName,
        timestamps: false,
        freezeTableName: true,
    }
);

AccountGroupMaster.belongsTo(AccountGroupMaster, { as: "ParentGroup", foreignKey: 'Parent_AC_id', targetKey: 'Group_Id' });
AccountGroupMaster.belongsTo(UserMaster, { foreignKey: "Created_By", targetKey: "id", });
AccountGroupMaster.belongsTo(UserMaster, { foreignKey: "Alter_By", targetKey: "id", });

export const accountGroupAccKey = {
    Group_Id: `${modelName}.Group_Id`,
    Group_Name: `${modelName}.Group_Name`,
    Alias_name: `${modelName}.Alias_name`,
    Parent_AC_id: `${modelName}.Parent_AC_id`,
    ChildGroups: `${modelName}.ChildGroups`,
    ERP_Id: `${modelName}.ERP_Id`,
    Alter_Id: `${modelName}.Alter_Id`,
    Created_By: `${modelName}.Created_By`,
    Created_Time: `${modelName}.Created_Time`,
    Alter_By: `${modelName}.Alter_By`,
    Alter_Time: `${modelName}.Alter_Time`,
};
