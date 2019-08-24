var express=require('express');
var router=express.Router();
var Post=require('../../model/Post');
var checkAuth=require('../middleware/check-auth');
router.get('/list',checkAuth,function (req,res) {
  Post.find({}).populate('author').exec(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:'Server Error',
        error:err
      })
    }else{
      if(rtn.length<1){
        res.status(204).json({
          message:'No content'
        })
      }else{
        res.status(200).json({
            posts:rtn
        })

      }
    }

  })

})
router.get('/detail/:id',checkAuth,function (req,res) {
  Post.findById(req.params.id).populate('author').exec(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:'Server Error',
        error:err
      })
    }else{
      if(rtn == null){
        res.status(204).json({
          message:'No content found'
        })

      }
    else{
      res.status(200).json({
        post:rtn
      })
    }
  }
  })

})
router.delete('/:id',checkAuth,function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:'Server Error',
        error:err
      })
    }else {
      res.status(200).json({
        message:'Posts deleted'
      })
    }

  })

})
router.post('/add',checkAuth,function (req,res) {
  var post=new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;

  post.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:'Server Error',
        error:err
      })
    }else {
      res.status(201).json({
        message:'Post created'
      })
    }

  })
})
router.patch('/:id',checkAuth,function (req,res) {
  var updateOps={};

  for(var ops of req.body){
    updateOps[ops.proName]=ops.value;
  }
  Post.findByIdAndUpdate(req.params.id,{$set:updateOps},function (err,rtn) {

    if(err){
      res.status(500).json({
        message:'Server Error',
        error:err
      })
    }else {
      res.status(200).json({
        message:'Post update successfully'
      })
    }

  })
})
module.exports=router;
