import { gql, request } from "graphql-request";
import { stateType } from "../types/types";
export class Graphql {
    static async gRequest(query: string): Promise<any> {
        return await request("http://localhost:8888/graphql", query);
        // @ts-ignore
        // return await request(process.env.REACT_APP_BACKEND_API+'/graphql',query)
    }

    static async checkUser(email: string,name: string,surname: string,password: string,): Promise<any> {
        const query = `
                query {
                    checkUser(email:"${email}",name:"${name}",surname:"${surname}",password:"${password}")
                }
            `;
        const data = await this.gRequest(query);
        return data.checkUser;
    }

    static async DeleteUser(email: string): Promise<any> {
        const query: string = `
                mutation{
                    DeleteUser(email:"${email}")
                }
            `;
        const data = await this.gRequest(query);
        return data.DeleteUser;
    }

    static async AddUser({verificationCode,confirmPassword,surname,password,name,email,}: stateType,code: string): Promise<any> {
        const mutation: string = `
                mutation{
                    SaveUser(verificationCode:"${verificationCode}",code:"${code}",email:"${email}",name:"${name}",surname:"${surname}",password:"${password}")
                }
            `;
        const data = await this.gRequest(mutation);
        return data.SaveUser;
    }

    static async getUsers(): Promise<any> {
        const query: string = `
                query{
                    getUsers{
                        id  
                        email
                        name
                        surname
                        password
                    }
                }
            `;
        const data = await this.gRequest(query);
        return data.getUsers
    }

    static async LoginQuery(loginEmail: string,loginPassword: string,): Promise<any> {
        const query = `
                query{
                    Login(loginEmail:"${loginEmail}",loginPassword:"${loginPassword}")
                }
            `;
        const data = await this.gRequest(query);
        return data.Login;
    }

    static async TokenVerify(token: string|null): Promise<any> {
        const query = `
                query{
                    TokenVerify(token:"${token}")
                }
            `;
        const data = await this.gRequest(query);
        if(data.TokenVerify === 'please login again'){
            return data.TokenVerify
        }
        return JSON.parse(data.TokenVerify);
    }

    static async ChangePassword(oldPassword: string,email: string,): Promise<any> {
        const query = `
                query{
                    ChangePassword(oldPassword:"${oldPassword}",email:"${email}")
                }
            `;
        const data = await this.gRequest(query);
        return data.ChangePassword;
    }

    static async ChangePasswordSave(newPassword: string,code: string,verificationCode: string,email: string,): Promise<any> {
        const mutation = `
                mutation{
                    ChangePasswordSave(newPassword:"${newPassword}",code:"${code}",verificationCode:"${verificationCode}",email:"${email}")
                }
            `;
        const data = await this.gRequest(mutation);
        return data.ChangePasswordSave;
    }
}
