import express from 'express'
import { createComment,getComment,deleteComment } from '../controllers/commentController.js'
import {verifyToken} from '../middleware/verifyToken.js'

const router = express.Router()

// @api/comment/create
router.post('/create', verifyToken, createComment)

// @api/comment/get
router.get('/:videoId', getComment)


// @api/comment/get
router.delete('/:id', verifyToken,deleteComment)


export default router