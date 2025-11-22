import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';
import { z } from "zod";

export interface RouteAttributes {
    Route_Id: number;
    Route_Name: string;
}

export type RouteCreationAttributes = Optional<RouteAttributes, "Route_Id">

export class RouteMaster extends Model<RouteAttributes, RouteCreationAttributes> {}

export const routeSchema = z.object({
    Route_Name: z.string().min(1, "Route_Name is required").max(150, 'Route_Name must be at most 150 characters'),
});

RouteMaster.init({
    Route_Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    Route_Name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    tableName: 'tbl_Route_Master',
    modelName: 'RouteMaster',
    timestamps: false,
    freezeTableName: true
});
