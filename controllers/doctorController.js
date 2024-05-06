import doctorModel from "../model/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
/* ------------------------------------- API for adding user ------------------------------------ */

const addUser = async (req,res) => {
    try {
        const { name,email,password,speciality,degree,experience,about,fees,address } = req.body
        const imageFile = req.file
        console.log({ name,email,password,speciality,degree,experience,about,fees,address })
    } catch (error) {
        
    }
}

const changeAvilability = async (req,res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{
            available:!docData.available
        })
        res.json({status:true,message:"Doctor availability changed"})
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}

const doctorList = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({status:true,doctors})
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}

/* ------------------------------------ API for doctor login ------------------------------------ */
const loginDoctor = async (req,res) => {
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email:email})
        if(!doctor){
            return res.json({success:false,message:"No Account associated with this email"})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        } else{
            return res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }    
}

export { changeAvilability,doctorList, loginDoctor }