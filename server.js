import express from "express"
import cors from "cors"
import "dotenv/config"

/* ----------------------------------------- App Config ----------------------------------------- */
const app = express()
const port = process.env.PORT || 4000

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