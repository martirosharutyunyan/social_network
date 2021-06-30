import bcrypt from "bcrypt";
import { changePasswordType, nodemailerMessageType, SavePasswordType } from "../types/types";
import { mailer } from "./nodemailer";
import { UserDB } from '../sql/Sequelize';


export class ChangePassword {

    static async ChangePassword({ email, oldPassword}: changePasswordType): Promise<any> {
        try {
            const { password } = await UserDB.isThere(email);
            const checkPassword = await bcrypt.compare(oldPassword, password);
            if (!checkPassword) {
                return "error password is incorrect";
            }
            const code: string = `${Math.floor(Math.random() * 100000)}`;
            const hashedCode = await bcrypt.hash(code, 10);
            const message: nodemailerMessageType = {
                from: "tahku_ohjluhe@mail.ru",
                to: email,
                subject: "Congratulations",
                text: `this code:${code} if for changing password`,
            };
            mailer(message);
            return hashedCode;
        } catch (err) {
            return err
        }
    }

    static async SavePassword({ email, code, newPassword, password, verificationCode}: SavePasswordType):Promise<any> {
        try {
            const checkCode = await bcrypt.compare(verificationCode, code);
            if (!checkCode) {
                return "Code is incorect";
            }
            const HashedNewPassword = await bcrypt.hash(newPassword, 10);
            await UserDB.changePassword(HashedNewPassword, email);
            return "Password changed";
        } catch (err) {
            return err
        }
    }

}
