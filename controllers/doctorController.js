
/* ------------------------------------- API for adding user ------------------------------------ */

const addUser = async (req,res) => {
    try {
        const { name,email,password,speciality,degree,experience,about,fees,address } = req.body
        const imageFile = req.file
        console.log({ name,email,password,speciality,degree,experience,about,fees,address })
    } catch (error) {
        
    }
}

export { addUser }