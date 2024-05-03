import doctorModel from "../model/doctorModel.js"

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

export { changeAvilability,doctorList }