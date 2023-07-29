const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

router.get('/',(req,res)=>{
    res.render('index.ejs');
})

module.exports=router;