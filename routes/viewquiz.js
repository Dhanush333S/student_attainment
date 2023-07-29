const { render } = require('ejs');
const express=require('express');
const router=express.Router();
const session=require('express-session');
router.use(express.urlencoded({extended:false}));
var db=require('./connection');


router.get('/',(req,res)=>{
    select=`Select * from exp_quiz1_mapping where subject_code='${req.session.crs}' `;
    db.query(select,(err,result)=>{
        if (err){
            res.render('error.ejs',{err:err});
            return;
        }
        if(result.length<1){
            res.render('error.ejs',{err:'Fill in the test mapping'});
            return;
        }
        let dict=JSON.parse(JSON.stringify(result));
        res.render('viewquiz.ejs',{dict:dict,title:`QUIZ 1 ${dict[0].version}`,back:'/index'});
    })
})

router.post('/',(req,res)=>{
    console.log(req.body.quiz)
    select=`Select * from exp_${req.body.quiz}_mapping where subject_code='${req.session.crs}' and version='${req.body.version}' `;
    db.query(select,(err,result)=>{
        if (err){
            res.render('error.ejs',{err:err});
            return;
        }
        if(result.length<1){
            res.render('error.ejs',{err:'Fill in the test mapping'});
            return;
        }
        let dict=JSON.parse(JSON.stringify(result));
        res.render('viewquiz.ejs',{dict:dict,title:`${req.body.quiz.substring(0,4).toLocaleUpperCase()} ${(req.body.quiz)[4]} ${dict[0].version}`,back:'/index'});
    })
})

module.exports=router;