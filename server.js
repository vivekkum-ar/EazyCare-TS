import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb"
import connectCloudinary from "./config/cloudinary"

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
app.get("/",(req,res) => {
    res.send("API is Working")
})

/* ----------------------------------------- API Listen ----------------------------------------- */
app.listen(port,()=> {
    console.log(`App listening on port ${port}`)
})