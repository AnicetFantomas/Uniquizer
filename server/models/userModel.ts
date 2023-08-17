import mongoose from 'mongoose';

interface User extends mongoose.Document {
    username: string;
    email: string;
    password?: string; // Make the property optional by adding `?`
  }


const userShema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        min: 3,
        max: 20
    },
    phoneNumber : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        max: 50
    },
    password : {
        type : String,
        required : true,
        min: 8
    }
},
{
    timestamps : true
}
)
export default mongoose.model('User', userShema);