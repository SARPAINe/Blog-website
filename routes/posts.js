const express=require('express');
const router=express.Router();
const Post=require('../models/post');



router.get("/:postID", (req, res) => {
  
  const requestedPostId = req.params.postID;
  Post.findOne({ _id: requestedPostId }, (err, post) => {
    res.render("post", { post: post});
  });

});

router.post("/comment/:postID", (req, res) => {

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  console.log(req.body);
  console.log(req.user.username);
  const id=req.params.postID;
  let user='<h3>'+req.user.username+'</h3>';
  let comment='\n<h4>'+req.body.postComment+'</h4>';
  let date=new Date();
  let time="\nPosted on "+date.getHours()+":"+date.getMinutes()+", "+months[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear();
  let fullComment=user+comment+time;
  Post.updateOne(
    { _id: id }, 
    { $push: { comment: fullComment } },
    (err=>{
      if(err)
      {
        console.log(err);
      }
      else{
        res.redirect('/posts/'+id);

      }
    })
  );

  


});


module.exports=router;