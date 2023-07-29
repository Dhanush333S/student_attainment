const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

let postSub={};

router.get('/',(req,res)=>{
    res.render('po.ejs');
})

router.post('/',(req,res)=>{
    let count=1;
    
    for(var i=1;i<=12;i++){
        select=`Select SUM(po${i}) as sum,SUM(level*po${i}) as po from exp_level where year='${req.body.year}'`;
        db.query(select,(err,result)=>{
            if(err){
                res.render('error.ejs',{err:err});
                return;
            }
            postSub[`po${count}`]=result[0].po/result[0].sum;
            ++count;
        })
    }
    selectPSO1=`Select SUM(pso1) as sum,SUM(level*pso1) as po from exp_level where year='${req.body.year}'`;
    db.query(selectPSO1,(errPSO1,resultPSO1)=>{
        if(errPSO1){
            res.render('error.ejs',{err:errPSO1});
            return;
        }
        postSub.pso1=resultPSO1[0].po/resultPSO1[0].sum;
    })

    selectPSO2=`Select SUM(pso2) as sum,SUM(level*pso2) as po from exp_level where year='${req.body.year}'`;
    db.query(selectPSO2,(errPSO2,resultPSO2)=>{
        if(errPSO2){
            res.render('error.ejs',{err:errPSO2});
            return;
        }
        postSub.pso2=resultPSO2[0].po/resultPSO2[0].sum;
        postSub.year=req.body.year;
        res.render('podisplay.ejs',{post:postSub});
    })
});

module.exports=router;