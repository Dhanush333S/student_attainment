const { render } = require('ejs');
const express=require('express');
const router=express.Router();
const session=require('express-session');
router.use(express.urlencoded({extended:false}))
var db=require('./connection');
var co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;

router.get('/',(req,res)=>{
    res.render('quizmap.ejs',{back:'/index'});
})

router.post('/',(req,res)=>{

    post={subject_code:`${req.session.crs}`,
        version:req.body.version,q1:req.body.q1,q2:req.body.q2,q3:req.body.q3,q4:req.body.q4,q5:req.body.q5,q6:req.body.q6,
        q7:req.body.q7,q8:req.body.q8,q9:req.body.q9,q10:req.body.q10,q11:req.body.q11,q12:req.body.q12,q13:req.body.q13,q14:req.body.q14,q15:req.body.q15,
        mq1:req.body.mq1,mq2:req.body.mq2,mq3:req.body.mq3,mq4:req.body.mq4,mq5:req.body.mq5,mq6:req.body.mq6,
        mq7:req.body.mq7,mq8:req.body.mq8,mq9:req.body.mq9,mq10:req.body.mq10,mq11:req.body.mq11,mq12:req.body.mq12,mq13:req.body.mq13,mq14:req.body.mq14,mq15:req.body.mq15
    }

    s0=`Delete from exp_${req.body.quiz}_mapping where subject_code='${req.session.crs}' and version='${req.body.version}' `;
    db.query(s0,(err,result)=>{
        if (err)
        throw err;
    })
    s=`Insert into exp_${req.body.quiz}_mapping Set ?`;
    db.query(s,post,(err,result)=>{
         if (err)
         throw err;
    })

    s1=`Select * from exp_${req.body.quiz}_mapping where subject_code='${req.session.crs}' and version='${req.body.version}' `;
    console.log(s1)
    db.query(s1,(err,result)=>{
        if (err)
        throw err;
        let dict=JSON.parse(JSON.stringify(result));
         let data=Object.values(dict[0]);
          for(var i=3;i<18;i++){
                  if(data[i]=='1')
                  co1+=data[i+15];
                  if(data[i]=='2')
                  co2+=data[i+15];
                  if(data[i]=='3')
                  co3+=data[i+15];
                  if(data[i]=='4')
                  co4+=data[i+15];
                  if(data[i]=='5')
                  co5+=data[i+15];
                  if(data[i]=='6')
                  co6+=data[i+15];
             }
        console.log(`${co1} ${co2} ${co3} ${co4} ${co5} ${co6}`)
        s2=`UPDATE exp_${req.body.quiz}_mapping SET co1='${co1}',co2='${co2}',co3='${co3}',co4='${co4}',co5='${co5}',co6='${co6}' where subject_code='${req.session.crs}' `;
        db.query(s2,(err,result)=>{
            if (err)
            throw err;
            co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;
        });
    });
    res.render('quizmap.ejs',{back:'/index'});
})

module.exports=router;