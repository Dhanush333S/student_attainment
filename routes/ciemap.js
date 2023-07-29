const { render } = require('ejs');
const express=require('express');
const router=express.Router();
const session=require('express-session');
router.use(express.urlencoded({extended:false}))
var db=require('./connection');
var co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;

router.get('/',(req,res)=>{
    res.render('ciemap.ejs',{back:'/index'});
})

router.post('/',(req,res)=>{
    console.log(req.body.test)
    post={subject_code:req.session.crs,
        q1a:req.body.q1a,q1b:req.body.q1b,q1c:req.body.q1c,q2a:req.body.q2a,q2b:req.body.q2b,q2c:req.body.q2c,
        q3a:req.body.q3a,q3b:req.body.q3b,q3c:req.body.q3c,q4a:req.body.q4a,q4b:req.body.q4b,q4c:req.body.q4c,
        q5a:req.body.q5a,q5b:req.body.q5b,q5c:req.body.q5c,q6a:req.body.q6a,q6b:req.body.q6b,q6c:req.body.q6c,
        mq1a:req.body.mq1a,mq1b:req.body.mq1b,mq1c:req.body.mq1c,mq2a:req.body.mq2a,mq2b:req.body.mq2b,mq2c:req.body.mq2c,
        mq3a:req.body.mq3a,mq3b:req.body.mq3b,mq3c:req.body.mq3c,mq4a:req.body.mq4a,mq4b:req.body.mq4b,mq4c:req.body.mq4c,
        mq5a:req.body.mq5a,mq5b:req.body.mq5b,mq5c:req.body.mq5c,mq6a:req.body.mq6a,mq6b:req.body.mq6b,mq6c:req.body.mq6c
    };

    s0=`Delete from exp_${req.body.test}_mapping where subject_code='${req.session.crs}'`;
    db.query(s0,(err,result)=>{
        if (err)
        throw err;
    })
    s=`Insert into exp_${req.body.test}_mapping SET ?`;
    db.query(s,post,(err,result)=>{
        if (err)
        throw err;
    });
    s1=`Select * from exp_${req.body.test}_mapping where subject_code='${req.session.crs}'`;
    console.log(s1);
    db.query(s1,(err,result)=>{
        if (err)
        throw err;
        dict=JSON.parse(JSON.stringify(result));
        data=Object.values(dict[0]);
        for(var i=1;i<20;i++){
            if(data[i]=='1')
            co1+=data[i+18];
            if(data[i]=='2')
            co2+=data[i+18];
            if(data[i]=='3')
            co3+=data[i+18];
            if(data[i]=='4')
            co4+=data[i+18];
            if(data[i]=='5')
            co5+=data[i+18];
            if(data[i]=='6')
            co6+=data[i+18];
        }
        console.log(`${co1} ${co2} ${co3} ${co4} ${co5} ${co6}`);
        s2=`UPDATE exp_${req.body.test}_mapping SET co1='${co1}',co2='${co2}',co3='${co3}',co4='${co4}',co5='${co5}',co6='${co6}' where subject_code='${req.session.crs}'`;
        db.query(s2,(err,result)=>{
            if (err)
            throw err;
            co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;
        })
    })
    res.render('ciemap.ejs',{back:'/index'});
})
module.exports=router;