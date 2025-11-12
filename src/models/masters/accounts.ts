import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';

export type AccountMasterTypes = {
    Acc_Id: number;
    Account_name: string;
    Account_Alias_name: string;
    Group_Id: number | null;
    ERP_Id: number | null;
    Alter_Id: number | null;
    Created_By: number | null;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date;
};

type AccountMasterTypesCreationAttributes = Optional<AccountMasterTypes, 'Acc_Id'>;

export class AccountMaster extends Model<AccountMasterTypes, AccountMasterTypesCreationAttributes>
    implements AccountMasterTypes {
    public Acc_Id!: number;
    public Account_name!: string;
    public Account_Alias_name!: string;
    public Group_Id!: number | null;
    public ERP_Id!: number | null;
    public Alter_Id!: number | null;
    public Created_By!: number | null;
    public Created_Time!: Date;
    public Alter_By!: number | null;
    public Alter_Time!: Date;
}

AccountMaster.init(
    {
        Acc_Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Account_name: {
            type: DataTypes.STRING(350),
            allowNull: false
        },
        Account_Alias_name: {
            type: DataTypes.STRING(350),
            allowNull: false
        },
        Group_Id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ERP_Id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Alter_Id: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        timestamps: false,
        freezeTableName: true
    }
)