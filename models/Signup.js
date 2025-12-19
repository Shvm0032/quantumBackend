import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unque:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

const Signup = mongoose.model("signup",SignupSchema);
export default Signup;


