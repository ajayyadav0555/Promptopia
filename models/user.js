import { Schema,model,models } from "mongoose";

const UserSchema=new Schema({
    email:{
        type:String,
        required:[true,'Email is required!'],
        unique:[true,"Email is already exists!"]
    },
    username:{
        type:String,
        required:[true,'Username is required!'],
        match:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"Username is Invalid,it should conatin 8-20 alphanumaric letters and be unique!"]
    },
    image:{
        type:String,
    }

})

const User=models.User||model("User",UserSchema);
export default User;