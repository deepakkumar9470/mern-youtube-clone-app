import { createError } from '../error/error.js'
import Video from '../models/Video.js'
import User from '../models/User.js'


export const createVideo = async (req,res,next) =>{
  const newVideo = new  Video({userId : req.user.id, ...req.body})
  try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (error) {
    next(error)
  }
    
}

export const getVideo = async (req,res,next) =>{

 try {
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)
 } catch (error) {
    return next(createError(404, 'Oops video not found'))
 }
}

export const deleteVideo = async (req,res,next) =>{

    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, 'Video not found'))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id)
    
            res.status(200).json('Video has been deleted')
        }else{
          return next(createError(404, 'You can delete only your video!'))
        }
        
      } catch (error) {
          next(error)
      }
}


export const editVideo =  async (req,res,next) =>{

  try {
    const video = await Video.findById(req.params.id)
    if(!video) return next(createError(404, 'Video not found'))
    if(req.user.id === video.userId){
        const updateVideo = await Video.findByIdAndUpdate(req.params.id, 
            {
            $set : req.body
            },
           {new : true}
        );

        res.status(200).json(updateVideo)
    }
    
  } catch (error) {
    return next(createError(404, 'You can update only your video!'))
  }
}



export const addViews =  async (req,res,next) =>{

   try {
        await Video.findByIdAndUpdate(req.params.id, 
        {
            $inc : {views : 1}
        }
        );
        res.status(200).json('The view has been increased..')
   } catch (error) {
      next(error)
   }
}

export const trendVideo =  async (req,res,next) =>{

  try {
    const videos = await Video.find().sort({views : -1})
    res.status(200).json(videos)
} catch (error) {
    next(error)
}
}


export const randomVideo =  async (req,res,next) =>{

    try {
      const videos = await Video.aggregate([{$sample : {size  : 40}}])
      res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}


export const subVideo =  async (req,res,next) =>{

    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;
        const list =  await Promise.all(
            subscribedChannels.map(channelId =>{
                return  Video.find({userId : channelId})
            })
        )
        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
    } catch (error) {
      next(error)
    }
}





export const getByTags =  async (req,res,next) =>{
    const tags = req.query.tags.split(',')
    console.log(tags)
    try {
       const videos = await Video.find({tags : {$in : tags}}).limit(20)
       res.status(200).json(videos)
   } catch (error) {
     next(error)
   }
}


export const search =  async (req,res,next) =>{
    const query = req.query.q
    try {
       const videos = await Video.find({
        title: {$regex: query, $options : "i" },
       }).limit(20)
       res.status(200).json(videos)
   } catch (error) {
     next(error)
   }
   }