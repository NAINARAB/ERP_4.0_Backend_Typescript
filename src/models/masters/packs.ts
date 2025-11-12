import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';

export interface PackAttributes {
    Pack_Id: number;
    Pack: string;
}

export type PackCreationAttributes = Optional<PackAttributes, "Pack_Id">

export class PackMaster
    extends Model<PackAttributes, PackCreationAttributes>
    implements PackAttributes {
    declare Pack_Id: number;
    declare Pack: string;
}

PackMaster.init({
    Pack_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
    },
    Pack: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'tbl_Pack_Master',
    timestamps: false,
    freezeTableName: true
});
