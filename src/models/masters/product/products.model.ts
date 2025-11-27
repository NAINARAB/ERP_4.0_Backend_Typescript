import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequalizer";
import { z } from "zod";
import { BrandMaster } from "./brand.model";
import { ProductGroupMaster } from "./productGroup.model";
import { PackMaster } from "./packs.model";
import { UnitMaster } from "./units.model";
import { UserMaster } from "../users/users.model";

const modelName = 'ProductMaster';

export interface ProductAttributes {
    Product_Id: bigint;
    Product_Code: string | null;
    Product_Name: string;
    Short_Name: string | null;
    Product_Description: string | null;
    Brand: number;
    Product_Group: number;
    Pack_Id: number;
    UOM_Id: number;
    IS_Sold: number | null;
    Display_Order_By: number | null;
    Product_Image_Name: string | null;
    Product_Image_Path: string | null;
    HSN_Code: string | null;
    Gst_P: number;
    Cgst_P: number;
    Sgst_P: number;
    Igst_P: number;
    ERP_Id: bigint | null;
    Pos_Brand_Id: number | null;
    IsActive: number;
    Product_Rate: number;
    Max_Rate: number;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
}

export const productCreationSchema = z.object({
    Product_Code: z
        .string("Product Code must be a string")
        .max(150, "Product Code must be at most 150 characters")
        .nullable(),
    Product_Name: z
        .string("Product Name must be a string")
        .max(500, "Product Name must be at most 500 characters"),
    Short_Name: z
        .string("Short Name must be a string")
        .max(150, "Short Name must be at most 150 characters")
        .optional()
        .nullable(),
    Product_Description: z
        .string("Product Description must be a string")
        .max(500, "Product Description must be at most 500 characters")
        .optional()
        .nullable(),
    Brand: z.number("Brand must be a number"),
    Product_Group: z.number("Product Group must be a number"),
    Pack_Id: z.number("Pack Id must be a number"),
    UOM_Id: z.number("UOM Id must be a number"),
    IS_Sold: z.number("IS Sold must be a number").nullable(),
    Display_Order_By: z.number("Display Order must be a number").optional().nullable(),
    Product_Image_Name: z
        .string("Image name must be a string")
        .max(500, "Image name must be at most 500 characters")
        .optional()
        .nullable(),
    Product_Image_Path: z
        .string("Image path must be a string")
        .max(500, "Image path must be at most 500 characters")
        .optional()
        .nullable(),
    HSN_Code: z
        .string("HSN Code must be a string")
        .max(50, "HSN Code must be at most 50 characters")
        .optional()
        .nullable(),
    Gst_P: z.number("GST % must be a number"),
    Cgst_P: z.number("CGST % must be a number"),
    Sgst_P: z.number("SGST % must be a number"),
    Igst_P: z.number("IGST % must be a number"),
    ERP_Id: z.bigint("ERP Id must be a bigint").optional().nullable(),
    Pos_Brand_Id: z.number("POS Brand Id must be a number").optional().nullable(),
    Product_Rate: z.number("Product Rate must be a number"),
    Max_Rate: z.number("Max Rate must be a number"),
    IsActive: z.number("IsActive must be a number").optional(),
    Created_By: z.number("Created By must be a number"),
    Created_Time: z.date("Created Time must be a valid date"),
    Alter_Id: z.number("Alter Id must be a bigint"),
});

export const productUpdateSchema = z.object({
    Product_Code: z
        .string("Product Code must be a string")
        .max(150, "Product Code must be at most 150 characters")
        .nullable(),
    Product_Name: z
        .string("Product Name must be a string")
        .max(500, "Product Name must be at most 500 characters"),
    Short_Name: z
        .string("Short Name must be a string")
        .max(150, "Short Name must be at most 150 characters")
        .nullable(),
    Product_Description: z
        .string("Product Description must be a string")
        .max(500, "Product Description must be at most 500 characters")
        .nullable(),
    Brand: z.number("Brand must be a number"),
    Product_Group: z.number("Product Group must be a number"),
    Pack_Id: z.number("Pack Id must be a number"),
    UOM_Id: z.number("UOM Id must be a number"),
    IS_Sold: z.number("IS Sold must be a number").nullable(),
    Display_Order_By: z.number("Display Order must be a number").nullable(),
    Product_Image_Name: z
        .string("Image Name must be a string")
        .max(200, "Image Name must be at most 200 characters")
        .nullable(),
    Product_Image_Path: z
        .string("Image Path must be a string")
        .max(200, "Image Path must be at most 200 characters")
        .nullable(),
    HSN_Code: z
        .string("HSN Code must be a string")
        .max(50, "HSN Code must be at most 50 characters")
        .nullable(),
    Gst_P: z.number("GST % must be a number"),
    Cgst_P: z.number("CGST % must be a number"),
    Sgst_P: z.number("SGST % must be a number"),
    Igst_P: z.number("IGST % must be a number"),
    ERP_Id: z.bigint("ERP Id must be a bigint").nullable(),
    Pos_Brand_Id: z.number("POS Brand Id must be a number").nullable(),
    Product_Rate: z.number("Product Rate must be a number"),
    Max_Rate: z.number("Max Rate must be a number"),
    IsActive: z.number("IsActive must be a number"),
    Alter_Id: z.number("Alter Id must be a bigint"),
    Alter_By: z.number("Alter By must be a number"),
    Alter_Time: z.date("Alter Time must be a valid date"),
});

export type ProductCreationAttributes = Optional<
    ProductAttributes,
    'Product_Id' | 'Product_Code' | 'Short_Name' | 'Product_Description' | 'IS_Sold' | 'Display_Order_By' |
    'Product_Image_Name' | 'Product_Image_Path' | 'HSN_Code' | 'ERP_Id' | 'Pos_Brand_Id' | 'IsActive' |
    'Alter_Id' | 'Created_Time' | 'Alter_By' | 'Alter_Time'
>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> { }

Product.init(
    {
        Product_Id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
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
            allowNull: false
        },
        Product_Group: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Pack_Id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UOM_Id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Product_Image_Path: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        HSN_Code: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        Gst_P: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0
        },
        Cgst_P: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0
        },
        Sgst_P: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0
        },
        Igst_P: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0
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
            allowNull: false,
            defaultValue: 1
        },
        Product_Rate: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0
        },
        Max_Rate: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: sequelize.literal("FLOOR(RANDOM() * 1000000000)")
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: "tbl_Product_Master",
        modelName: modelName,
        timestamps: false,
        freezeTableName: true
    }
);

Product.belongsTo(BrandMaster, { foreignKey: 'Brand', targetKey: 'Brand_Id' });
Product.belongsTo(ProductGroupMaster, { foreignKey: 'Product_Group', targetKey: 'Pro_Group_Id' });
Product.belongsTo(PackMaster, { foreignKey: 'Pack_Id', targetKey: 'Pack_Id' });
Product.belongsTo(UnitMaster, { foreignKey: 'UOM_Id', targetKey: 'Unit_Id' });
Product.belongsTo(UserMaster, { foreignKey: 'Created_By', targetKey: 'id' });
Product.belongsTo(UserMaster, { foreignKey: 'Alter_By', targetKey: 'id' });


export const productAccKey = {
    Product_Id: `${modelName}.Product_Id`,
    Product_Code: `${modelName}.Product_Code`,
    Product_Name: `${modelName}.Product_Name`,
    Short_Name: `${modelName}.Short_Name`,
    Product_Description: `${modelName}.Product_Description`,
    Brand: `${modelName}.Brand`,
    Product_Group: `${modelName}.Product_Group`,
    Pack_Id: `${modelName}.Pack_Id`,
    UOM_Id: `${modelName}.UOM_Id`,
    IS_Sold: `${modelName}.IS_Sold`,
    Display_Order_By: `${modelName}.Display_Order_By`,
    Product_Image_Name: `${modelName}.Product_Image_Name`,
    Product_Image_Path: `${modelName}.Product_Image_Path`,
    HSN_Code: `${modelName}.HSN_Code`,
    Gst_P: `${modelName}.Gst_P`,
    Cgst_P: `${modelName}.Cgst_P`,
    Sgst_P: `${modelName}.Sgst_P`,
    Igst_P: `${modelName}.Igst_P`,
    ERP_Id: `${modelName}.ERP_Id`,
    Pos_Brand_Id: `${modelName}.Pos_Brand_Id`,
    Product_Rate: `${modelName}.Product_Rate`,
    Max_Rate: `${modelName}.Max_Rate`,
    IsActive: `${modelName}.IsActive`,
    Alter_Id: `${modelName}.Alter_Id`,
    Created_By: `${modelName}.Created_By`,
    Created_Time: `${modelName}.Created_Time`,
    Alter_By: `${modelName}.Alter_By`,
    Alter_Time: `${modelName}.Alter_Time`
}