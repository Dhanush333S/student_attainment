const { render } = require('ejs');
const express=require('express');
const router=express.Router();
const session=require('express-session');
router.use(express.urlencoded({extended:false}))
var db=require('./connection');


router.get('/',(req,res)=>{
    select=`Select * from exp_test1_mapping where subject_code='${req.session.crs}' `;
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
        res.render('viewcie.ejs',{dict:dict,title:'TEST 1',back:'/index'});
    })
})
router.post('/',(req,res)=>{
    console.log(req.body.test)
    select=`Select * from exp_${req.body.test}_mapping where subject_code='${req.session.crs}' `;
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
        res.render('viewcie.ejs',{dict:dict,title:`${req.body.test.substring(0,4).toLocaleUpperCase()} ${(req.body.test)[4]}`,back:'/index'});
    })
})

module.exports=router;