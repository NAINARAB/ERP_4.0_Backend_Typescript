import { Request, Response } from "express";
import sql from "mssql";
import { hashPassword, verifyPassword } from "./hash";
import { signJwt } from "./jwtAuth";
import { DbUser, JwtUser } from "../types";

const appUsersTable = '[' + (process.env.USERPORTALDB || 'User_Portal_Test') + '].[dbo].[tbl_Users]';

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }

    try {
        const result = await new sql.Request()
            .input("username", sql.VarChar, username)
            .query<DbUser>(`
                SELECT TOP 1
                    [Global_User_ID],
                    [Local_User_ID],
                    [Company_Id],
                    [Name],
                    [Password],
                    [UserTypeId],
                    [UserName],
                    [UDel_Flag],
                    [Created],
                    [Updated]
                FROM ${appUsersTable}
                WHERE [UserName] = @username AND (ISNULL([UDel_Flag], 0) = 0)`);

        const user = result.recordset[0]; 
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        const hashedPassword = await hashPassword(user.Password);

        const ok = await verifyPassword(password, hashedPassword);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const payload: JwtUser = {
            sub: user.Global_User_ID,
            username: user.UserName,
            name: user.Name,
            companyId: user.Company_Id ?? undefined,
            roleId: user.UserTypeId ?? undefined
        };

        const token = signJwt(payload);
        return res.json({
            token,
            user: payload
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

export default {
    login
};
