import { connections } from 'mongoose';
import { Client } from 'pg';
import { Sequelize, DataTypes} from 'sequelize';
export const client = new Client({
    database:process.env.postgresDBname,
    password:process.env.postgresDBpassword,
    port:5432,
    host:'127.0.0.1',
    user:'postgres',
})

export const sequelize = new Sequelize(process.env.POSTGRESDBNAME,'postgres',process.env.POSTGRESDBPASSWORD,{
    host:'127.0.0.1',
    dialect:'postgres'
})


export const model = sequelize.define('users',{
    email:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    },
    surname:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
})

