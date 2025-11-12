import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/sequalizer";

// DB columns:
export interface ProductAttributes {
    Product_Id: bigint;
    Product_Code: string | null;
    Product_Name: string | null;
    Short_Name: string | null;
    Product_Description: string | null;
    Brand: number | null;
    Product_Group: number | null;
    Pack_Id: number | null;
    UOM_Id: number | null;
    IS_Sold: number | null;
    Display_Order_By: number | null;
    Product_Image_Name: string | null;
    Product_Image_Path: string | null;
    HSN_Code: string | null;
    Gst_P: string | number | null;
    Cgst_P: string | number | null;
    Sgst_P: string | number | null;
    Igst_P: string | number | null;
    ERP_Id: bigint | null;
    Pos_Brand_Id: number | null;
    IsActive: number | null;
    Product_Rate: string | number | null;
    Max_Rate: string | number | null;
    Alter_Id: bigint | null;
    Created_By: number | null;
    Created_Time: Date | null;
    Alter_By: number | null;
    Alter_Time: Date | null;
}

export type ProductCreationAttributes = Optional<ProductAttributes, "Product_Id">;

export class Product
    extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes {
    declare Product_Id: bigint;
    declare Product_Code: string | null;
    declare Product_Name: string | null;
    declare Short_Name: string | null;
    declare Product_Description: string | null;
    declare Brand: number | null;
    declare Product_Group: number | null;
    declare Pack_Id: number | null;
    declare UOM_Id: number | null;
    declare IS_Sold: number | null;
    declare Display_Order_By: number | null;
    declare Product_Image_Name: string | null;
    declare Product_Image_Path: string | null;
    declare HSN_Code: string | null;
    declare Gst_P: string | number | null;
    declare Cgst_P: string | number | null;
    declare Sgst_P: string | number | null;
    declare Igst_P: string | number | null;
    declare ERP_Id: bigint | null;
    declare Pos_Brand_Id: number | null;
    declare IsActive: number | null;
    declare Product_Rate: string | number | null;
    declare Max_Rate: string | number | null;
    declare Alter_Id: bigint | null;
    declare Created_By: number | null;
    declare Created_Time: Date | null;
    declare Alter_By: number | null;
    declare Alter_Time: Date | null;
}

Product.init(
    {
        Product_Id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Product_Code: { type: DataTypes.STRING(150), allowNull: true },
        Product_Name: { type: DataTypes.STRING(500), allowNull: true },
        Short_Name: { type: DataTypes.STRING(150), allowNull: true },
        Product_Description: { type: DataTypes.STRING(500), allowNull: true },
        Brand: { type: DataTypes.INTEGER, allowNull: true },
        Product_Group: { type: DataTypes.INTEGER, allowNull: true },
        Pack_Id: { type: DataTypes.INTEGER, allowNull: true },
        UOM_Id: { type: DataTypes.INTEGER, allowNull: true },
        IS_Sold: { type: DataTypes.INTEGER, allowNull: true },
        Display_Order_By: { type: DataTypes.INTEGER, allowNull: true },
        Product_Image_Name: { type: DataTypes.STRING(200), allowNull: true },
        Product_Image_Path: { type: DataTypes.STRING(200), allowNull: true },
        HSN_Code: { type: DataTypes.STRING(50), allowNull: true },
        Gst_P: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
        Cgst_P: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
        Sgst_P: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
        Igst_P: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
        ERP_Id: { type: DataTypes.BIGINT, allowNull: true },
        Pos_Brand_Id: { type: DataTypes.INTEGER, allowNull: true },
        IsActive: { type: DataTypes.INTEGER, allowNull: true },
        Product_Rate: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
        Max_Rate: { type: DataTypes.DECIMAL(18, 2), allowNull: true },
        Alter_Id: { type: DataTypes.BIGINT, allowNull: true },
        Created_By: { type: DataTypes.INTEGER, allowNull: true },
        Created_Time: { type: DataTypes.DATE, allowNull: true },
        Alter_By: { type: DataTypes.INTEGER, allowNull: true },
        Alter_Time: { type: DataTypes.DATE, allowNull: true }
    },
    {
        sequelize,
        tableName: "tbl_Product_Master",
        timestamps: false,
        freezeTableName: true
    }
);
