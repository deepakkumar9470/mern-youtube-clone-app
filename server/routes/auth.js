import express from 'express'
import { signup,login,googleAuth } from '../controllers/authController.js'


const router = express.Router()

// @api/auth/signin
router.post('/signup', signup)



// @api/auth/login
router.post('/login', login)


// @api/auth/google
router.post('/google', googleAuth)



export default router