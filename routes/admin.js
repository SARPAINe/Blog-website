const express=require('express');
const router=express.Router();
const Post=require('../models/post');

router.get('/posts',async (req,res)=>{
  let count;
  count = await Post.countDocuments((err,c)=>{
    count=c;
    
  });
  Post.find((err,posts)=>{
   
    res.render('admin/posts',{
      count:count,
      posts:posts
    }); 
  });
});

router.get("/compose", (req, res) => {
  res.render("admin/compose",{
    postTitle:"",
    postBody:""
  });
});

router.post("/compose", (req, res) => {
  console.log(req.body);
  const post = new Post(
    {
      title: req.body.postTitle,
      post: req.body.postBody,
      comment:[]
    }
  )
  post.save();
  res.redirect("/admin/posts");
})

//get edit post
router.get('/posts/edit-post/:id',async (req,res,next)=>{
  let post;
  try{
    post=await Post.findById(req.params.id);
  }catch(error)
  {
    console.log(err);
  }
  res.render('admin/edit_post',{
    postTitle:post.title,
    postBody:post.post,
    id:req.params.id
  });
});

//post edit post
router.post('/posts/edit-post/:id',async (req,res,next)=>{
  let post;
  try{
    post=await Post.findById(req.params.id);
  }catch(error)
  {
    console.log(err);
  }
  post.title=req.body.postTitle;
  post.post=req.body.postBody;
  post.save(err=>{
    if(err)
    console.log(err);
  })
  req.flash("success","Post edited!");
  res.redirect('/admin/posts');

});

//delete post
router.get('/posts/delete-post/:id',async (req,res,next)=>{
  try{
    post=await Post.findById(req.params.id);
  }catch(error)
  {
    console.log(err);
  }
  post.delete(err=>{
    if(err)
    console.log(err);
  })
  req.flash('success','Post deleted!');
  res.redirect("/admin/posts");
})

module.exports=router;