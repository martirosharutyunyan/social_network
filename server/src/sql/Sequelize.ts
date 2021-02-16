import { model } from "../model/postgresDB";

export class UserDB {
    static async isThere(email: string) {
        try {
            let data: any = await model.findOne({ where: { email } });
            if (data === null) {
                return undefined;
            }
            data = data.toJSON();
            return data;
        } catch (err) {
            return err
        }
    }

    static async changePassword(password: string, email: string) {
        try {
            await model.update({ email, password }, { where: { email } });
        } catch(err) {
            return err
        }
    }

    static async AddUser(email: string,name: string,surname: string,password: string) {
        try {
            model.create({ email, name, surname, password });
        } catch(err) {
            return err
        }
    }

    static async getUsers() {
        try {
            const data = await model.findAll();
            return data;
        } catch(err) {
            return err
        }
    }

    static async Delete(email: string) {
        try {
            model.destroy({ where: { email } });
        } catch(err) {
            return err
        }
    }
}
