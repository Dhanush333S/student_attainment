const express=require('express');
const session = require('express-session');
const router=express.Router();
var db=require('./connection');
router.use(express.urlencoded({extended:false}));

router.get('/',(req,res)=>{
    res.render('first.ejs');
});

router.post('/',(req,res)=>{
    let s="Select id from staff";
    db.query(s,(err,result)=>{
        if(err)
        throw err;
        result.forEach((row) => {
            if(row.id==req.body.staff){
                req.session.staffid=row.id;
                return res.redirect('/selectsem');
            }
        });
        res.render('first.ejs',{login:'Incorret Staff ID'});
    })
});


module.exports=router;