import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequalizer';

export type UserAttributes = {
    UserId: number;
    Global_User_ID: number | null;
    UserTypeId: number | null;
    Name: string | null;
    UserName: string;
    Password: string;
    BranchId: number | null;
    UDel_Flag: number | null;
};

type UserCreationAttributes = Optional<UserAttributes, 'UserId' | 'UDel_Flag'>;

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public UserId!: number;
    public Global_User_ID!: number | null;
    public UserTypeId!: number | null;
    public Name!: string | null;
    public UserName!: string;
    public Password!: string;
    public BranchId!: number | null;
    public UDel_Flag!: number | null;
}

User.init(
    {
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Global_User_ID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        UserTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Name: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        UserName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        BranchId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        UDel_Flag: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'tbl_Users',
        timestamps: false,
        freezeTableName: true
    }
);
