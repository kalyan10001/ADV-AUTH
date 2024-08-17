import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendwelcomeEmail } from "../mailtrap/emails.js";
export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, 
		});

		await user.save();

		
		generateTokenAndSetCookie(res, user._id);

		await sendVerificationEmail(user.email,verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const verifyEmail=async(req,res)=>{

	const {code}=req.body;
	try {
		const user= await User.findOne({
			verificationToken:code,
			verificationTokenExpiresAt:{$gt:Date.now()}
		});
		if(!user)
		{
			return res.status(400).json({success:false,message:"invalid or expired verification code"});
		}
		user.isVerified=true;
		user.verificationToken=undefined;
		user.verificationTokenExpiresAt=undefined;
		await user.save();

		await sendwelcomeEmail(user.email,user.name);

		res.status(200).json({
			success:true,
			message:"email verified successfully",
			user:{
				...user._doc,
				password:undefined,
			}
		});
		
	} catch (error) {
		console.log("error in verify email",error);
		res.status(500).json({success:false,message:"server error"});
	}
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
	try {
		const user=await User.findOne({email});
		if(!user)
		{
			return res.status(400).json({success:false,message:"invalid credentials"});
		}
		const isPasswordValid=await bcryptjs.compare(password,user.password);
		if(!isPasswordValid)
			{
				return res.status(400).json({success:false,message:"invalid credentials"});
			}
		generateTokenAndSetCookie(res,user._id);
		
		user.lastLogin=new Date();
		await user.save();
		res.status(200).json({
			success:true,
			message:"logged in successfully",
			user:{
				...user._doc,
				password:undefined,
			},
		});
	} catch (error) {
		console.log("error in login",error);
		res.status(400).json({success:false,message:error.message});
	}
}

export const logout=async(req,res)=>{
    res.clearCookie("token");
	res.status(200).json({sucess:true,message:"logged out successfully"});
}
