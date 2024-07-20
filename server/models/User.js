import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String},
    urls:[
      {
        originalUrl:String,
        shortUrl:String,
        date:{type:Date, default:new Date()}
      }
    ]
})
export default mongoose.model('User',userSchema);