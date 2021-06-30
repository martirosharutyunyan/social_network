import {
    GraphQLInt as gInt,
    GraphQLString as gString,
    GraphQLID as gID,
    GraphQLBoolean as gBoolean,
    GraphQLSchema as gSchema,
    GraphQLObjectType as gObjectType,
    GraphQLList as gList
} from "graphql";
import { ChangePassword } from "../routes/ChangePassword";
import { DeleteUser } from "../routes/DeleteUser";
import { Login } from "../routes/Login";
import { Registration } from "../routes/Registration";
import { TokenVerify } from "../routes/TokenVerify";
import { UserDB } from "../sql/Sequelize";
import { changePasswordType, checkUserType, LoginType, SavePasswordType, saveUserType } from "../types/types";

const user = new gObjectType({
    name:'User',
    fields:()=>({
        id:{type:gID},
        email:{ type: gString },
        name:{ type: gString },
        surname:{ type: gString },
        password:{ type: gString }
    })
})

const query = new gObjectType({
    name:'Query',
    fields:()=>({
        getUsers:{
            type:new gList(user),
            async resolve(parents, args){
                let data = await UserDB.getUsers()
                return data
            }
        },
        checkUser:{
            type:gString,
            args:{ email:{ type: gString }, name:{ type: gString }, surname:{ type: gString }, password:{ type: gString }, },
            async resolve(parents,args:checkUserType){
                let data = await Registration.CheckUser(args)
                return data
            }
        },
        Login:{
            type:gString,
            args:{loginEmail:{ type: gString }, loginPassword:{ type: gString }},
            async resolve(parents, args:LoginType){
                return await Login(args)
            }
        },
        ChangePassword:{
            type:gString,
            args:{oldPassword:{ type: gString }, email:{ type: gString }},
            async resolve(parents, args:changePasswordType){
                return await ChangePassword.ChangePassword(args)
            }
        },
        TokenVerify:{
            type:gString,
            args:{token:{ type: gString },},
            async resolve(parents,args){
                return await TokenVerify(args.token)
            }
        }
    })
})

const mutation = new gObjectType({
    name:'Mutation',
    fields:()=>({
        SaveUser:{
            type:gString,
            args:{verificationCode:{ type: gString },code:{ type: gString },email:{ type: gString },name:{ type: gString },surname:{ type: gString },password:{ type: gString }},
            async resolve(parents,args:saveUserType){
                return await Registration.SaveUser(args)
            }
        },
        ChangePasswordSave:{
            type:gString,
            args:{code:{ type: gString },verificationCode:{ type: gString },newPassword:{ type: gString },email:{ type: gString },},
            async resolve(parents, args:SavePasswordType){
                return await ChangePassword.SavePassword(args)
            }
        },
        DeleteUser:{
            type:gString,
            args:{email:{ type: gString },},
            async resolve(parents, args){
                return await DeleteUser(args.email)
            }
        }
    })
})

export const schema = new gSchema({
   query,
   mutation,
})