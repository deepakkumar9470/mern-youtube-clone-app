import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import mongoose from "mongoose";
const PORT = process.env.PORT || 8000
import cookieParser from 'cookie-parser'
const app = express()
import cors from 'cors'
import authRoute from './routes/auth.js'
import videoRoute from './routes/video.js'
import commentRoute from './routes/comment.js'
import userRoute from './routes/user.js'

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/video', videoRoute)
app.use('/api/comment', commentRoute)

const connect = () =>{
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('MongoDb Connected..'))
.catch((err)=> console.log(err))
}


app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || 'Something went wrong'

    return res.status(status).json({
        success : false,
        status,
        message
    })
}) 

connect()

app.get('/', (req,res)=>{
    
    res.send('Test app')
})

app.listen(PORT, console.log(`Server started at port http://localhost:${PORT}`))