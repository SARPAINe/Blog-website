const mongoose = require('mongoose');

const PostSchema=module.exports=mongoose.Schema({
  title: String,
  post: String,
  comment: [{
    type: String
}]
});


const Post=module.exports=mongoose.model('Post',PostSchema);

