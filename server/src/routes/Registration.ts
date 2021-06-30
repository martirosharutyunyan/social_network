import { checkUserType, saveUserType } from '../types/types';
import bcrypt from "bcrypt";
import { mailer } from "./nodemailer";
import { UserDB } from "../sql/Sequelize";
import { nodemailerMessageType } from "../types/types";

export class Registration{
    static async SaveUser({ code, name, surname, verificationCode, email, password }: saveUserType): Promise<any> {
        try {
            let checkCode = await bcrypt.compare(verificationCode, code)
            console.log(code,verificationCode)
            if (!checkCode) {
                return "code is false";
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            await UserDB.AddUser(email.toLowerCase(), name, surname, hashedPassword);
            return "User Saved";
        } catch (err) {
            return err
        }
    }

    static async CheckUser({password,email,surname,name}:checkUserType):Promise<any> {
        try {
            if (
                name.trim().length === 0 ||
                surname.trim().length === 0 ||
                email.trim().length <= 8 ||
                password.trim().length < 8
            ) {
                return "the inputs are not filled";
            }
            let checkEmail = await UserDB.isThere(email);
            if (checkEmail !== undefined) {
                return "this email already in use";
            }
            let code: string = `${Math.floor(Math.random() * 100000)}`;
            let hash = await bcrypt.hash(code, 10);
            const message: nodemailerMessageType = {
                from: "tahku_ohjluhe@mail.ru",
                to: email,
                subject: "Congratulations",
                text: `dzer cody ${code}`,
            };
            console.log(code)
            mailer(message);
            return hash;
        } catch(err) {
            return err
        }
    }
    
}