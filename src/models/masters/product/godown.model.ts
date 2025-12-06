import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequalizer";
import { z } from "zod";
import { UserMaster } from "../users/users.model";

const modelName = "Godown";

export type GodownTypes = {
    Godown_Id: number;
    Godown_Name: string;
    Godown_Tally_Id: number | null;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
};

type GodownCreationAttributes = Optional<
    GodownTypes,
    "Godown_Id" | "Godown_Tally_Id" | "Alter_By" | "Alter_Time"
>;

export class GodownMaster extends Model<
    GodownTypes,
    GodownCreationAttributes
> {}

export const godownCreateSchema = z.object({
    Godown_Name: z
        .string()
        .min(1, "Godown Name is required")
        .max(150, "Godown Name must be at most 150 characters long"),
    Godown_Tally_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Created_By: z.number(),
    Created_Time: z.date(),
});

export const godownUpdateSchema = z.object({
    Godown_Name: z.string().max(150).optional(),
    Godown_Tally_Id: z.number().optional().nullable(),
    Alter_Id: z.number(),
    Alter_By: z.number(),
    Alter_Time: z.date(),
});

GodownMaster.init(
    {
        Godown_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Godown_Name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        Godown_Tally_Id: {
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
        tableName: "tbl_Godown_Master",
        modelName: modelName,
        timestamps: false,
        freezeTableName: true,
    }
);

GodownMaster.belongsTo(UserMaster, { foreignKey: "Created_By", targetKey: "id" });
GodownMaster.belongsTo(UserMaster, { foreignKey: "Alter_By", targetKey: "id" });

export const godownAccKey = {
    Godown_Id: `${modelName}.Godown_Id`,
    Godown_Name: `${modelName}.Godown_Name`,
    Godown_Tally_Id: `${modelName}.Godown_Tally_Id`,
    Alter_Id: `${modelName}.Alter_Id`,
    Created_By: `${modelName}.Created_By`,
    Created_Time: `${modelName}.Created_Time`,
    Alter_By: `${modelName}.Alter_By`,
    Alter_Time: `${modelName}.Alter_Time`,
};
