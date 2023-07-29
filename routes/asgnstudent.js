const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');
let data=[];

router.get('/',(req,res)=>{
    let s=`Select usn,name from exp_student where semester='${req.session.sem}' order by usn`
    db.query(s,(err,result)=>{
        if (err)
        throw err;
        data=JSON.parse(JSON.stringify(result));
        res.render('asgnstudent.ejs',{total:data});
    })
})

router.post('/',(req,res)=>{
    res.render('asgnstudent.ejs',{total:data,upload:'**Successfully Uploaded'});

})

module.exports=router;