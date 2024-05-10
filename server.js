import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

/* ----------------------------------------- App Config ----------------------------------------- */
const app = express()
const port = process.env.PORT || 4000

/* --------------------------- Connection with MongoDB and Cloudinary --------------------------- */
connectDB()
connectCloudinary()

/* ----------------------------------------- Middlewares ---------------------------------------- */
app.use(express.json())
app.use(cors())

/* ---------------------------------------- API Endpoints --------------------------------------- */
// localhost:4000/api/admin/add-doctor
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)

app.get("/",(req,res) => {
    res.send("API is Working")
})

app.use("/api/user",userRouter)

/* ----------------------------------------- API Listen ----------------------------------------- */
app.listen(port,()=> {
    console.log(`App listening on port: ${port}`)
})