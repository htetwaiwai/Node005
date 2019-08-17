var express = require('express');
var router = express.Router();
var User=require('../model/User');
var Post=require('../model/Post');
var Admin=require('../model/Admin');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Nay' });
});
router.get('/home',function (req,res) {
  res.render('home',{title:'Home'});


});
router.get('/signup',function (req,res) {
  res.render('signup');

});

router.post('/signup',function (req,res) {
  var admin=new Admin();
  admin.name=req.body.name;
  admin.email=req.body.email;
  admin.password=req.body.pwd;

  admin.save(function (err,rtn) {
    if(err)throw err;
    res.redirect('/signin');

  });

})
router.get('/signin',function (req,res) {
  res.render('signin');

});
router.post('/signin',function (req,res) {
  Admin.findOne({email:req.body.email},function (err,admin) {
    if(err)throw err;
    console.log(admin);
    console.log(req.body.password);
  if(admin !=null && Admin.compare(req.body.password,admin.password)){
    req.session.user={name:admin.name,email:admin.email,id:admin._id}
    res.redirect('/users/useradd');
  }else {
    res.redirect('/signin');
  }

});

});
router.post('/duemail',function (req,res) {
  Admin.findOne({email:req.body.email},function (err,rtn) {
    if(err)throw err;
    if(rtn !=null){
      res.json({status:true})
    }else {
      res.json({status:false})
    }
  });

})
router.get('/logout',function (req,res) {
  req.session.destroy(function (err) {
    if(err)throw err;
    res.redirect('/')

  })

})
module.exports = router;
