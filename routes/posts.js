var express = require('express');
var router = express.Router();
var Post=require('../model/Post');
var User=require('../model/User');
router.get('/postadd',function (req,res) {
  User.find({},function (err,rtn) {
    if(err)throw err;

    res.render('posts/post-add',{users:rtn});
  })


});

router.post('/postadd',function (req,res) {
  var post=new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;
  post.save(function (err,rtn) {
    if(err)throw err;
    console.log(rtn);
    res.redirect('/posts/postlist');

  });

})
router.get('/postlist',function (req,res) {
  Post.find({}).populate('author').exec(function (err,rtn) {
    if(err)throw err;
    res.render('posts/post-list',{posts:rtn});

  });

})
router.get('/postdetail/:id',function (req,res) {
  console.log(req.params.id);
  Post.findById(req.params.id,function (err,rtn) {
    if(err)throw err;
    res.render('posts/post-detail',{post:rtn});

  });

})
router.get('/postupdate/:id',function (req,res) {
Post.findById(req.params.id,function (err,rtn) {
  if(err)throw err;
  res.render('posts/post-update',{post:rtn});

});

})
router.post('/postupdate',function (req,res) {
  var update={
    title:req.body.title,
    content:req.body.name,
    author:req.body.author
  }
  Post.findByIdAndUpdate(req.body.id,{$set : update},function (err,rtn) {
    if(err)throw err;
    res.redirect('/posts/postdetail/'+req.body.id);

});

})
router.get('/userdel/:id',function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err)throw err;
    res.redirect('/posts/postlist');

  });

})



module.exports = router;
