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
        res.status(200).json({result:existingUser,token,msg:"signedd"});

     } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}
export const signup = async (req, res) => {
    const { email, password, confirmPassword, fullName } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
      }
  
      const hashedPass = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email, password: hashedPass, name: fullName });
  
      const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ result, token });
    } catch (error) {
      console.error("Signup error: ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
