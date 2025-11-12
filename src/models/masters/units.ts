import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer'; // adjust path

export type UnitMasterTypes = {
    Unit_Id: number;
    Units: string;
    ERP_Id: number | null;
    Alter_Id: number | null;
    Created_By: number | null;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
};

type UnitMasterCreationAttributes = Optional<
    UnitMasterTypes,
    'Unit_Id' | 'Created_Time' | 'Alter_Time'
>;

export class UnitMaster
    extends Model<UnitMasterTypes, UnitMasterCreationAttributes>
    implements UnitMasterTypes
{
    public Unit_Id!: number;
    public Units!: string;
    public ERP_Id!: number | null;
    public Alter_Id!: number | null;
    public Created_By!: number | null;
    public Created_Time!: Date;
    public Alter_By!: number | null;
    public Alter_Time!: Date | null;
}

UnitMaster.init(
    {
        Unit_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Units: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        ERP_Id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Created_Time: {
            type: DataTypes.DATE,
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
        tableName: 'tbl_UOM',
        timestamps: false,
        freezeTableName: true
    }
);
