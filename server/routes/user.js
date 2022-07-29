import express from 'express'
import {getUser,editUser,deleteUser,subscribe,unsubscribe,like,dislike } from '../controllers/userController.js'

const router = express.Router()

import {verifyToken} from '../middleware/verifyToken.js'


// @api/users/find/id
router.get('/find/:id', getUser)


// @api/users/id
router.put('/:id', verifyToken, editUser)


// @api/users/id
router.delete('/:id', verifyToken,deleteUser)


// @api/users/sub/id
router.put('/sub/:id',verifyToken, subscribe)

// @api/users/unsub/id
router.put('/unsub/:id', verifyToken ,unsubscribe)

// @api/users/like/videoId
router.put('/like/:videoId',verifyToken , like)

// @api/users/dislike/videoId
router.put('/dislike/:videoId', verifyToken ,dislike)




// @api/users/id
// router.put('/:id', deleteUser)
export default router