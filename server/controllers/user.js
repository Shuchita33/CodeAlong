import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signin=async(req,res)=>{
    const {email,password}=req.body;        
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User doesn't exist"});

        const isPassCorrect=await bcrypt.compare(password,existingUser.password);
        if(!isPassCorrect) return res.status(400).json({message:"Invalid Credentials"});
        const token=jwt.sign({email:existingUser.email, id:existingUser._id},process.env.SECRET_KEY,{expiresIn:'1h'});
        res.status(200).json({result:existingUser,token});

     } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}
export const signup=async(req,res)=>{
    const{email,password,confirmPassword,firstName,lastName}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(404).json({message:"User already exists"});

        if(password!=confirmPassword) return res.status(400).json({message:"Passwords don't match"});

        const hashedPass=await bcrypt.hash(password,12);
        const result=await User.create({email,password:hashedPass,name:`${firstName} ${lastName}`});

        const token=jwt.sign({email:result.email, id:result._id},process.env.SECRET_KEY,{expiresIn:'1h'});
        res.status(200).json({result,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

export const getUserUrls = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const user = await User.findById(id)
        //console.log(user);
        if (!user) return res.status(404).json({ message: "User not found" });
        const reversedUrls = user.urls.reverse();
        res.status(200).json(reversedUrls);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const addUserUrl = async (req, res) => {
    const { id } = req.params; 
    const { url } = req.body; 
  
    try {
      const user = await User.findById(id);  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
         
      user.urls.push(url);
      await user.save();
  
      res.status(200).json({ message: 'URL added to user successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};