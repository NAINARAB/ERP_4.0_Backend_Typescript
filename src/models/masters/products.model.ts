import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";

export interface ProductAttributes {
    Product_Id: bigint;
    Product_Code: string | null;
    Product_Name: string;
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
    Gst_P: string | number;
    Cgst_P: string | number;
    Sgst_P: string | number;
    Igst_P: string | number;
    ERP_Id: bigint | null;
    Pos_Brand_Id: number | null;
    Product_Rate: number;
    Max_Rate: string | number | null;
    IsActive: number;
    Created_By: number;
    Created_Time: Date;
    Alter_Id: bigint | null;
    Alter_By: number | null;
    Alter_Time: Date | null;
}

export const productCreationSchema = z.object({
    Product_Code: z.string().max(150).nullable(),
    Product_Name: z.string().max(500),
    Short_Name: z.string().max(150).nullable(),
    Product_Description: z.string().max(500).nullable(),
    Brand: z.number().nullable(),
    Product_Group: z.number().nullable(),
    Pack_Id: z.number().nullable(),
    UOM_Id: z.number().nullable(),
    IS_Sold: z.number().nullable(),
    Display_Order_By: z.number().nullable(),
    Product_Image_Name: z.string().max(200).nullable(),
    Product_Image_Path: z.string().max(200).nullable(),
    HSN_Code: z.string().max(50).nullable(),
    Gst_P: z.number(),
    Cgst_P: z.number(),
    Sgst_P: z.number(),
    Igst_P: z.number(),
    ERP_Id: z.bigint().nullable(),
    Pos_Brand_Id: z.number().nullable(),
    Product_Rate: z.number(),
    Max_Rate: z.number().nullable(),
    IsActive: z.number(),
    Created_By: z.number(),
    Created_Time: z.date().nullable(),
    Alter_Id: z.bigint().nullable(),
    Alter_By: z.number().nullable(),
    Alter_Time: z.date().nullable()
});

export const productUpdateSchema = z.object({
    Product_Code: z.string().max(150).nullable(),
    Product_Name: z.string().max(500),
    Short_Name: z.string().max(150).nullable(),
    Product_Description: z.string().max(500).nullable(),
    Brand: z.number().nullable(),
    Product_Group: z.number().nullable(),
    Pack_Id: z.number().nullable(),
    UOM_Id: z.number().nullable(),
    IS_Sold: z.number().nullable(),
    Display_Order_By: z.number().nullable(),
    Product_Image_Name: z.string().max(200).nullable(),
    Product_Image_Path: z.string().max(200).nullable(),
    HSN_Code: z.string().max(50).nullable(),
    Gst_P: z.number(),
    Cgst_P: z.number(),
    Sgst_P: z.number(),
    Igst_P: z.number(),
    ERP_Id: z.bigint().nullable(),
    Pos_Brand_Id: z.number().nullable(),
    Product_Rate: z.number(),
    Max_Rate: z.number().nullable(),
    IsActive: z.number(),
    Alter_Id: z.bigint().nullable(),
    Alter_By: z.number().nullable(),
    Alter_Time: z.date().nullable()
});

export type ProductCreationAttributes = Optional<
    ProductAttributes, 
    "Product_Id" | 'IsActive' | 'Created_Time' | 'Alter_Time' | 'Alter_Id' | 'Created_By' | 'Alter_By'
>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> {}

Product.init(
    {
        Product_Id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Product_Code: { 
            type: DataTypes.STRING(150), 
            allowNull: true 
        },
        Product_Name: { 
            type: DataTypes.STRING(500), 
            allowNull: false 
        },
        Short_Name: { 
            type: DataTypes.STRING(150), 
            allowNull: true 
        },
        Product_Description: { 
            type: DataTypes.STRING(500), 
            allowNull: true 
        },
        Brand: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        Product_Group: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        Pack_Id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        UOM_Id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        IS_Sold: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        Display_Order_By: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        Product_Image_Name: { 
            type: DataTypes.STRING(200), 
            allowNull: true 
        },
        Product_Image_Path: { 
            type: DataTypes.STRING(200), 
            allowNull: true 
        },
        HSN_Code: { 
            type: DataTypes.STRING(50), 
            allowNull: true 
        },
        Gst_P: { 
            type: DataTypes.DECIMAL(18, 2), 
            allowNull: false 
        },
        Cgst_P: { 
            type: DataTypes.DECIMAL(18, 2), 
            allowNull: false 
        },
        Sgst_P: { 
            type: DataTypes.DECIMAL(18, 2), 
            allowNull: false 
        },
        Igst_P: { 
            type: DataTypes.DECIMAL(18, 2), 
            allowNull: false 
        },
        ERP_Id: { 
            type: DataTypes.BIGINT, 
            allowNull: true 
        },
        Pos_Brand_Id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        IsActive: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        Product_Rate: { 
            type: DataTypes.DECIMAL(18, 2), 
            allowNull: false 
        },
        Max_Rate: { 
            type: DataTypes.DECIMAL(18, 2), 
            allowNull: true 
        },
        Alter_Id: { 
            type: DataTypes.BIGINT, 
            allowNull: true 
        },
        Created_By: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        Created_Time: { 
            type: DataTypes.DATE, 
            allowNull: true 
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
        tableName: "tbl_Product_Master",
        timestamps: false,
        freezeTableName: true
    }
);
