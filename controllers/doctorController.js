import doctorModel from "../model/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../model/appointmentModel.js"
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

/* -------------------------- API to get appointments for doctor panel -------------------------- */
const appointmentsDoctor = async (req,res) => {
    try {
        const {docId} = req.body 
        const appointments = await appointmentModel.find({docId})
        return res.json({
            success: true,
            appointments
        })
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

/* --------------------- API to mark appointments completed for doctor panel -------------------- */
const appointmentComplete  = async (req,res) => {
    try {
        const {docId,appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted: true})
            return res.json({
                success: true,
                message: "Appointment Completed"
            })
        } else{
            return res.json({
                success: false,
                message: "Mark failed"
            })

        }
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


/* ---------------------------------- API to cancel appointment --------------------------------- */
const appointmentCancel  = async (req,res) => {
    try {
        const {docId,appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled: true})
            return res.json({
                success: true,
                message: "Appointment Cancelled "
            })
        } else{
            return res.json({
                success: false,
                message: "Cancellation failed"
            })

        }
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

/* ---------------------------------- API to get dashboard Data --------------------------------- */
const doctorDashboard = async (req,res) => {
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        const earnings = 0
        appointments.map((appointment,index) => {
            if (appointment.isCompleted || appointment.payment) {
                earnings+=appointment.amount
            } 
        })
        let patients = []
        appointments.map((appointment,index) => {
            if (patients.includes(appointment.userId)) {
                patients.push(appointment.userId)
            } 
        })

        const dashData = {
            earnings:earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointemts:appointments.reverse().slice(0,5)
        }

        return res.json({
            success:true,
            dashData
        })
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export { changeAvilability,doctorList, loginDoctor,appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard }