import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import helmet from "helmet"
import cors from "cors"

import errorMiddleware from "./middlewares/errorMid.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config() // private >>
const app = express()
connectDB() // MONGODB CONNECTION

app.use(helmet())

app.use(cors({
  origin:["https://spend-smart-rb-cloud.vercel.app", "http://localhost:5173"],
  credentials:true
}))

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/user/transactions", transactionRoutes)



app.get("/", (req, res, next) => {
    res.send("<h1>SERVER HOME</h1>")
})

app.use(errorMiddleware) // global error middleware

export default app