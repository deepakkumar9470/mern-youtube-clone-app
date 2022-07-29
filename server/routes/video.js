import express from 'express'
import { createVideo, getVideo,editVideo,deleteVideo,trendVideo,subVideo, 
         randomVideo, 
         addViews,
         getByTags,
         search} from '../controllers/videoController.js'
import {verifyToken} from '../middleware/verifyToken.js'

const router = express.Router()

// @api/video/create
router.post('/', verifyToken, createVideo)

// @api/video/find/id
router.get('/find/:id', getVideo)


// @api/video/find/id
router.put('/:id', verifyToken,editVideo)


// @api/video/find/id
router.delete('/:id', verifyToken,deleteVideo)


// @api/video/view/id
router.put('/view/:id', addViews)

// @api/video/trend
router.get('/trend', trendVideo)

// @api/video/random
router.get('/random', randomVideo)


// @api/video/sub
router.get('/sub',verifyToken, subVideo)



// @api/video/tags
router.get('/tags', getByTags)


// @api/video/search
router.get('/search', search)


export default router