const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

router.get('/',(req,res)=>{
    res.render('login.ejs');
});

router.post('/',(req,res)=>{
    let s="Select * from admin";
    db.query(s,(err,result)=>{
        if(err)
        throw err;
        result.forEach((row) => {
            if(row.username==req.body.username && row.password==req.body.password){
                req.session.username=row.username;
                res.redirect('/first')
            }
            else
            res.render('login.ejs',{login:"HI"});
            res.end();
        });
    });
});

module.exports=router;