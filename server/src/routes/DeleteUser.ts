import { UserDB } from "../sql/Sequelize";

export const DeleteUser = async (email: string): Promise<any> => {
    try {
        await UserDB.Delete(email);
        return "User deleted";
    } catch (err) {
        return err
    }
};
