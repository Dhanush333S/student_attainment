const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

router.get('/',(req,res)=>{
    res.render('selectsem.ejs');
});
router.post('/',(req,res)=>{
    req.session.sem=req.body.sem;
    console.log(req.session.sem)
    s="Select subject_code, semester_id,co from exp_subject";
    db.query(s,(err,result)=>{
        if (err)
        throw err;
        result.forEach((data) => {
            if(req.body.crs==data.subject_code && req.body.sem==data.semester_id ){
                req.session.crs=req.body.crs;
                req.session.sem=req.body.sem;
                req.session.co=data.co;
                return res.redirect('/index')
            }
        });
        res.render('selectsem.ejs',{login:'HI'})
    })
})


module.exports=router;