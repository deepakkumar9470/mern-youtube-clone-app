import mongoose from "mongoose";



const CommentSceme = mongoose.Schema({
    
  userId : {type :  String, required : true},
  videoId : {type :  String, required : true},
  desc : {type :  String, required : true},
 

}, {timestamops: true})


export default mongoose.model('Comment', CommentSceme)