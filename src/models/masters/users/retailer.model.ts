import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequalizer";
import { z } from "zod";
import { UserMaster } from "../users/users.model";
import { AreaMaster } from "../users/area.model";
import { DistrictMaster } from "../users/district.model";
import { StateMaster } from "../users/state.model";
import { RouteMaster } from "../users/route.model";
import { BranchMaster } from "../users/branch.model";

const modelName = "Retailer";

export type RetailerTypes = {
    Retailer_Id: number;
    Retailer_Code: string | null;
    isVendor: number;
    isRetailer: number;
    Retailer_Name: string;
    Contact_Person: string | null;
    Mobile_No: string | null;
    Retailer_Channel_Id: number | null;
    Retailer_Class: string | null;
    Route_Id: number;
    Area_Id: number;
    Reatailer_Address: string;
    Reatailer_City: string | null;
    PinCode: string | null;
    District_Id: number;
    State_Id: number;
    Branch_Id: number;
    Gstno: string | null;
    ERP_Id: string | null;
    Latitude: string | null;
    Longitude: string | null;
    Profile_Pic: string | null;

    Created_By: number;
    Created_Date: Date;
    Updated_By: number | null;
    Updated_Date: Date | null;

    Del_Flag: number;

    ImageName: string | null;
    ImagePath: string | null;
    ImageType: string | null;

    Others_5: string | null;
    Alter_Id: number;
    AC_Id: number | null;
};

type RetailerCreationAttributes = Optional<
    RetailerTypes,
    "Retailer_Id" | "Retailer_Code" | "Contact_Person" | "Mobile_No" | "Retailer_Channel_Id" 
    | "Retailer_Class" | "Reatailer_City" | "PinCode" | "Gstno" | "ERP_Id" | "Latitude"
    | "Longitude" | "Profile_Pic" | "Updated_By" | "Updated_Date" | "Del_Flag"
    | "ImageName" | "ImagePath" | "ImageType" | "Others_5" | "AC_Id"
>;

export class RetailerMaster extends Model<
    RetailerTypes,
    RetailerCreationAttributes
> {}

export const retailerCreateSchema = z.object({
    Retailer_Code: z.string().optional().nullable(),
    isVendor: z.number('isVendor is required'),
    isRetailer: z.number('isRetailer is required'),
    Retailer_Name: z.string().min(1, 'Retailer Name is required').max(250, 'Retailer Name should be less than 250 characters'),
    Contact_Person: z.string().max(150, 'Contact Person should be less than 150 characters').optional().nullable(),
    Mobile_No: z.string().max(50, 'Mobile No should be less than 50 characters').optional().nullable(),

    Retailer_Channel_Id: z.number().optional().nullable(),
    Retailer_Class: z.string().max(50, 'Retailer Class should be less than 50 characters').optional().nullable(),

    Route_Id: z.number('Route Id is required'),
    Area_Id: z.number('Area Id is required'),

    Reatailer_Address: z.string().max(250, 'Address should be less than 250 characters'),
    Reatailer_City: z.string().max(50, 'City should be less than 50 characters').optional().nullable(),
    PinCode: z.string().max(50, 'PinCode should be less than 50 characters').optional().nullable(),

    District_Id: z.number('District Id is required'),
    State_Id: z.number('State Id is required'),
    Branch_Id: z.number('Branch Id is required'),

    Gstno: z.string().max(50, 'Gstno should be less than 50 characters').optional().nullable(),
    ERP_Id: z.string().max(50, 'ERP_Id should be less than 50 characters').optional().nullable(),
    Latitude: z.string().max(50, 'Latitude should be less than 50 characters').optional().nullable(),
    Longitude: z.string().max(50, 'Longitude should be less than 50 characters').optional().nullable(),
    Profile_Pic: z.string().max(250, 'Profile_Pic should be less than 250 characters').optional().nullable(),

    Created_By: z.number('Created By is required'),
    Created_Date: z.date('Created Date is required'),

    Alter_Id: z.number('Alter Id is required'),
    AC_Id: z.number().optional().nullable(),
});

export const retailerUpdateSchema = z.object({
    Retailer_Code: z.string().optional().nullable(),
    isVendor: z.number('isVendor is required').optional(),
    isRetailer: z.number('isRetailer is required').optional(),
    Retailer_Name: z.string().max(250, 'Retailer Name should be less than 250 characters').optional(),
    Contact_Person: z.string().max(150, 'Contact Person should be less than 150 characters').optional().nullable(),
    Mobile_No: z.string().max(50, 'Mobile No should be less than 50 characters').optional().nullable(),

    Retailer_Channel_Id: z.number().optional().nullable(),
    Retailer_Class: z.string().max(50, 'Retailer Class should be less than 50 characters').optional().nullable(),

    Route_Id: z.number('Route Id is required').optional(),
    Area_Id: z.number('Area Id is required').optional(),

    Reatailer_Address: z.string().max(250, 'Address should be less than 250 characters').optional(),
    Reatailer_City: z.string().max(50, 'City should be less than 50 characters').optional().nullable(),
    PinCode: z.string().max(50, 'PinCode should be less than 50 characters').optional().nullable(),

    District_Id: z.number('District Id is required').optional(),
    State_Id: z.number('State Id is required').optional(),
    Branch_Id: z.number('Branch Id is required').optional(),

    Gstno: z.string().max(50, 'Gstno should be less than 50 characters').optional().nullable(),
    ERP_Id: z.string().max(50, 'ERP_Id should be less than 50 characters').optional().nullable(),
    Latitude: z.string().max(50, 'Latitude should be less than 50 characters').optional().nullable(),
    Longitude: z.string().max(50, 'Longitude should be less than 50 characters').optional().nullable(),
    Profile_Pic: z.string().max(250, 'Profile_Pic should be less than 250 characters').optional().nullable(),

    Updated_By: z.number('Updated By is required'),
    Updated_Date: z.date('Updated Date is required'),

    ImageName: z.string().max(150, 'ImageName should be less than 150 characters').optional().nullable(),
    ImagePath: z.string().max(200, 'ImagePath should be less than 200 characters').optional().nullable(),
    ImageType: z.string().max(50, 'ImageType should be less than 50 characters').optional().nullable(),
    Others_5: z.string().max(50, 'Others_5 should be less than 50 characters').optional().nullable(),

    Alter_Id: z.number('Alter Id is required'),
    AC_Id: z.number().optional().nullable(),
});

RetailerMaster.init(
    {
        Retailer_Id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        Retailer_Code: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        isVendor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isRetailer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Retailer_Name: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true,
        },
        Contact_Person: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        Mobile_No: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Retailer_Channel_Id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Retailer_Class: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Route_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Area_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Reatailer_Address: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        Reatailer_City: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PinCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        District_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        State_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Branch_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Gstno: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        ERP_Id: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Latitude: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Longitude: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Profile_Pic: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        Created_By: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Created_Date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        Updated_By: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Updated_Date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Del_Flag: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        ImageName: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        ImagePath: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        ImageType: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Others_5: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Alter_Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: sequelize.literal("FLOOR(RANDOM() * 1000000000)"),
        },
        AC_Id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "tbl_Retailers_Master",
        modelName: modelName,
        timestamps: false,
        freezeTableName: true,
    }
);

RetailerMaster.belongsTo(AreaMaster, { foreignKey: "Area_Id", targetKey: "Area_Id" });
RetailerMaster.belongsTo(DistrictMaster, { foreignKey: "District_Id", targetKey: "District_Id" });
RetailerMaster.belongsTo(StateMaster, { foreignKey: "State_Id", targetKey: "State_Id" });
RetailerMaster.belongsTo(RouteMaster, { foreignKey: "Route_Id", targetKey: "Route_Id" });
RetailerMaster.belongsTo(BranchMaster, { foreignKey: "Branch_Id", targetKey: "BranchId" });
RetailerMaster.belongsTo(UserMaster, { foreignKey: "Created_By", targetKey: "id" });
RetailerMaster.belongsTo(UserMaster, { foreignKey: "Updated_By", targetKey: "id" });

export const retailerAccKey = {
    Retailer_Id: `${modelName}.Retailer_Id`,
    Retailer_Code: `${modelName}.Retailer_Code`,
    isVendor: `${modelName}.isVendor`,
    isRetailer: `${modelName}.isRetailer`,
    Retailer_Name: `${modelName}.Retailer_Name`,
    Contact_Person: `${modelName}.Contact_Person`,
    Mobile_No: `${modelName}.Mobile_No`,
    Retailer_Channel_Id: `${modelName}.Retailer_Channel_Id`,
    Retailer_Class: `${modelName}.Retailer_Class`,
    Route_Id: `${modelName}.Route_Id`,
    Area_Id: `${modelName}.Area_Id`,
    Reatailer_Address: `${modelName}.Reatailer_Address`,
    Reatailer_City: `${modelName}.Reatailer_City`,
    PinCode: `${modelName}.PinCode`,
    District_Id: `${modelName}.District_Id`,
    State_Id: `${modelName}.State_Id`,
    Branch_Id: `${modelName}.Branch_Id`,
    Gstno: `${modelName}.Gstno`,
    ERP_Id: `${modelName}.ERP_Id`,
    Latitude: `${modelName}.Latitude`,
    Longitude: `${modelName}.Longitude`,
    Profile_Pic: `${modelName}.Profile_Pic`,
    Created_By: `${modelName}.Created_By`,
    Created_Date: `${modelName}.Created_Date`,
    Updated_By: `${modelName}.Updated_By`,
    Updated_Date: `${modelName}.Updated_Date`,
    Del_Flag: `${modelName}.Del_Flag`,
    ImageName: `${modelName}.ImageName`,
    ImagePath: `${modelName}.ImagePath`,
    ImageType: `${modelName}.ImageType`,
    Others_5: `${modelName}.Others_5`,
    Alter_Id: `${modelName}.Alter_Id`,
    AC_Id: `${modelName}.AC_Id`,
};
