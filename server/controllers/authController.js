import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { createError } from '../error/error.js';
import jwt from 'jsonwebtoken'



export const signup =  async(req,res,next) =>{
    
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password : hash})

        await newUser.save()
        res.status(201).json({msg : 'User has been created', user : newUser})
    } catch (error) {
        next(createError(404, 'Sorry not found!'))
    }
     
}



export const login = async (req,res,next) =>{

   try {
       
    const user = await User.findOne({name : req.body.name})
    if(!user) return createError(404, 'User not found')

    const isCorrect  = await bcrypt.compare(req.body.password, user.password)

    if(!isCorrect) return next(createError(400, 'Wrong credentials'))

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    const {password, ...others} = user._doc

    res.cookie('access_token', token, {
        httpOnly : true
    }).status(200).json(others)


   } catch (error) {
     next(createError(404, error))
   }
}




export const googleAuth = async (req,res,next) =>{
    
    try {
        const user = await User.findOne({email: req.body.email})
        if(user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            
            res.cookie('access_token', token, {
                httpOnly : true
            }).status(200).json(user._doc)

        }else{
            const newuser = new User({
                ...req.body,
                fromGoogle : true
            });

            const saveUser = await newuser.save()
            const token = jwt.sign({id: saveUser._id}, process.env.JWT_SECRET);
            
            res.cookie('access_token', token, {
                httpOnly : true
            }).status(200).json(saveUser._doc)
        }
    } catch (error) {
         next(error)
    }
}