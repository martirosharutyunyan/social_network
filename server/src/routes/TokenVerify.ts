import jwt from "jsonwebtoken";
import { UserDB } from "../sql/Sequelize";

export const TokenVerify = async (token: string): Promise<any> => {
    try {
        const decodedToken: any = jwt.verify(token, process.env.TOKENSECRETKEY);
        const userData = await UserDB.isThere(decodedToken.email)
        if(!userData){
            return 'no user finded'
        }
        const {password} = userData
        if(password !== decodedToken.password){
            return 'Password is incorrect'
        }
        return JSON.stringify(decodedToken, null, 2);
    } catch (err) {
        return 'please login again'
    }
};