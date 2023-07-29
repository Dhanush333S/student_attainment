const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

router.get('/',(req,res)=>{
    res.render('level.ejs',{link:'/level'});
})

router.post('/',(req,res)=>{
   avg=`Select AVG(AvgDICO) AS dico,AVG(co1p) AS co1,AVG(co2p) AS co2,AVG(co3p) AS co3,AVG(co4p) AS co4,AVG(co5p) AS co5,AVG(co6p) AS co6 from exp_student_co where subject_code='${req.session.crs}' `;
   db.query(avg,(err,result)=>{
    if(err){
        res.render('error.ejs',{err:err});
    }
    let avgCoAttainment=(result[0].co1+result[0].co2+result[0].co3+result[0].co4+result[0].co5+result[0].co6);
    select=`Select SUM(co1p+co2p+co3p+co4p+co5p+co6p) AS sum from exp_student_co where subject_code='${req.session.crs}' group by usn `;
    db.query(select,(errAssign,resultAssign)=>{
        if(errAssign){
            res.render('error.ejs',{err:errAssign});
            return;
        }
        let countAssign=0,total=0;
        resultAssign.forEach((dict) => {            
            if(dict.sum>avgCoAttainment)
            ++countAssign;
            ++total;
        });
        countAssign=(countAssign/total)*100;
        let level=0;
        if(countAssign>=req.body.level3)
        level=3;
        else if(countAssign>=req.body.level2)
        level=2;
        else if(countAssign>=req.body.level1)
        level=1;
////////////////////////////////////////////////////////////////////////
        avgSee=`Select AVG(sco1p) AS co1,AVG(sco2p) AS co2,AVG(sco3p) AS co3,AVG(sco4p) AS co4,AVG(sco5p) AS co5,AVG(sco6p) AS co6 from exp_student_co where subject_code='${req.session.crs}' `;
   db.query(avgSee,(errSee,resultSee)=>{
    if(errSee){
        res.render('error.ejs',{err:errSee});
        return;
    }
    let avgSee=(resultSee[0].co1+resultSee[0].co2+resultSee[0].co3+resultSee[0].co4+resultSee[0].co5+resultSee[0].co6);
    select=`Select SUM(sco1p+sco2p+sco3p+sco4p+sco5p+sco6p) AS sumSee from exp_student_co where subject_code='${req.session.crs}' group by usn `;
    
    db.query(select,(errEach,resultEach)=>{
        if(errEach){
            res.render('error.ejs',{err:errEach});
        }
        let countSee=0;
        resultEach.forEach((dict) => {
            if(dict.sumSee>avgSee)
            ++countSee;
        });
        countSee=(countSee/total)*100;
        if(countSee>=req.body.level3)
        level=(level*0.8)+(3*0.2);
        else if(countSee>=req.body.level2)
        level=(level*0.8)+(2*0.2);
        else if(countSee>=req.body.level1)
        level=(level*0.8)+(1*0.2);

        direct=`Select AvgDICO from exp_student_co where subject_code='${req.session.crs}'`;
        db.query(direct,(errDirect,resultDirect)=>{
            if(errDirect){
                res.render('error.ejs',{err:errDirect});
                return;
            }
            let countDirect=0;
            resultDirect.forEach((dict)=>{
                if(dict.AvgDICO>result[0].dico)
                ++countDirect;
            })
            countDirect=(countDirect/total)*!00;
            if(countSee>=req.body.level3)
            level=(level*0.9)+(3*0.1);
            else if(countSee>=req.body.level2)
            level=(level*0.9)+(2*0.1);
            else if(countSee>=req.body.level1)
            level=(level*0.9)+(1*0.1);
            del=`Delete from exp_level where subject_code='${req.session.crs}' `;
            db.query(del,(errDel)=>{
                if(errDel){
                    res.render('error.ejs',{err:errDel});
                    return;
                }
            })
            post={subject_code:req.session.crs,level:level};
            s=`Insert into exp_level SET ?`;
            db.query(s,post,(errInsert)=>{
                if(errInsert){
                    res.render('error.ejs',{err:errInsert});
                    return;
                }
            })
            res.render('level.ejs',{link:'/level',answer:level?level.toFixed(2):'Zero'});
            })
        
    })
   })
        
    })
   })
})

module.exports=router;