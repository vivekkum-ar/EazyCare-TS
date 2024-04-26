import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"

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
app.use('/api/admin',adminRouter)

app.get("/",(req,res) => {
    res.send("API is Working")
})

/* ----------------------------------------- API Listen ----------------------------------------- */
app.listen(port,()=> {
    console.log(`App listening on port http://localhost:${port}`)
})