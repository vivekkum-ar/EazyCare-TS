import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

/* --------------------------------- API to register a new user --------------------------------- */

const registerUser = async (req, res) => {
    try {
        const { name , email , password } = req.body;
        if(!name || !email || !password){
            return res.json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        /* ------------------------------------ Validating user email ----------------------------------- */
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Enter correct email"
            })
        }

        /* --------------------------------- Validating strong password --------------------------------- */
        if(password.length < 8){
            return res.json({
                status: false,
                message: "Enter a strong password"
            })
        }

        /* ------------------------------------ Hashing user password ----------------------------------- */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        /* -------------------------------------- Creating a token -------------------------------------- */
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        return res.json({
            success: true,
            token
        })


    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }

}

/* ------------------------------------- API for user login ------------------------------------- */

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                status:false,
                message: error.message
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({
                success:true,
                token
            })
        } else{
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            message: error.message
        })
    }
}

/* -------------------------------- API for getting user profile -------------------------------- */
const getProfile = async (req,res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select("-password")
        res.json({
            success:true,
            userData
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            message: error.message
        })
    }
}


/* -------------------------------- API for updating User Profile ------------------------------- */
const updateProfile = async (req,res) => {
    try {
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file
        
        if(!name || !phone || !address || !dob || !gender){
            return res.json({
                success:false,
                message: "Data missing"
            })
        }

        await userModel.findByIdAndUpdate(userId, {
          name,
          phone,
          address: JSON.parse(address),
          dob,
          gender,
        });

        if(imageFile){
            /* --------------------------------- upload image to cloudinary --------------------------------- */
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, {
                image: imageUrl
              });

            }
            res.json({
                success:true,
                message:"Profile updated"
            })
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            message: error.message
        })
    }
}

export {registerUser,loginUser,getProfile,updateProfile}