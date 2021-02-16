import mongoose from 'mongoose';
const Schema = mongoose.Schema;
  
const userSchema = new Schema({
    id:Number,
    name:String,
    surname:String,
    email:String,
    password:String,
});
 
export const User = mongoose.model('User',userSchema)


