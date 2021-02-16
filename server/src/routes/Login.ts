import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserDB } from "../sql/Sequelize";
import { LoginType } from "../types/types";
export const Login = async ({loginEmail,loginPassword}:LoginType): Promise<any> => {
    try {
        const user = await UserDB.isThere(loginEmail);
        if (!user) {
            return "User not finded";
        }
        const { email, surname, name, password } = user;
        let isPasswordTrue = await bcrypt.compare(loginPassword, password);
        if (!isPasswordTrue) {
            return  "Password is false";
        }
        const token = jwt.sign(
            { email, surname, name, password },
            process.env.TOKENSECRETKEY,
            {
                expiresIn: "1h",
            },
        );
        return token;
    } catch (err) {
        return err
    }
};
