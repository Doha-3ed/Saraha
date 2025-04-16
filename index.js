import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { bootstrape } from "./src/app.controller.js"
const app= express()
const port=process.env.PORT||3000
bootstrape(app,express)

app.listen(port,()=>{
    console.log(`Server is runnning on port ${port}`)
})