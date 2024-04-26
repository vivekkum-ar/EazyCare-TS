
/* ------------------------------------ API for adding doctor ----------------------------------- */

const addDoctor = async (req,res) => {
    try {
        const { name,email,password,speciality,degree,experience,about,fees,address } = req.body
        const imageFile = req.file
        
        /* ------------------------------ checking all data to add doctors ------------------------------ */
        if( !name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ){
            return res.json({
                success:false,
                message:"Missing details"
            })
        }
        /* ----------------------------------- Validating email format ---------------------------------- */
        if(validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter a valid email"
            })
        }
        console.log({ name,email,password,speciality,degree,experience,about,fees,address },imageFile)
    } catch (error) {
        
    }
} 

export { addDoctor }