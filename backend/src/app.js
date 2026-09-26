import express from 'express'
import authRoute from './routes/auth.routes.js'
import productRoute from './routes/product.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app=express()
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-6yqs.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth",authRoute)
app.use("/api/product",productRoute)


export default app