const express=require('express');
const session = require('express-session');
const { createPoolCluster } = require('mysql');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

let postarray=[];
let postsub={};

router.get('/',(req,res)=>{
    cos=`Select co from exp_subject where subject_code='${req.session.crs}' `;
    db.query(cos,(errCO,CO)=>{
        if(errCO)
        console.log(CO)
        s=`Select usn from exp_student where semester='${req.session.sem}' `;
        db.query(s,(err,result)=>{
            let dict = JSON.parse(JSON.stringify(result));
            for(var i=0;i<dict.length;i++){
                let data=dict[i];
                selectStudCo=`Select * from exp_student_co where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                db.query(selectStudCo,(errsco,resultsco)=>{
                    if(errsco){
                        res.render('error.ejs',{err:errsco});
                        return;
                    }
                if(selectStudCo.length<1){
                    res.render('error.ejs',{err:'Visit Course Outcome for CIE !!'});
                    return;
                }
                let dictselect=JSON.parse(JSON.stringify(resultsco));
                let co1=dictselect[0].co1p;
                let co2=dictselect[0].co2p;
                let co3=dictselect[0].co3p;
                let co4=dictselect[0].co4p;
                let co5=dictselect[0].co5p;
                let co6=dictselect[0].co6p;
                lab=`Select * from exp_lab_co where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                db.query(lab,(errLab,resultLab)=>{
                    if(errLab){
                        res.render('error.ejs',{err:errLab});
                        return;
                    }
                    let seep=0;
                    if(resultLab.length>0)
                    seep=(dictselect[0].sem_end_marks)/1.5;
                    else
                    seep=(dictselect[0].sem_end_marks)/1;
                    console.log(co1*0.8+'   '+seep)
                    co1=(co1*0.8)+(seep*0.2);
                    console.log(co1)
                    co2=(co2*0.8)+(seep*0.2);
                    co3=(co3*0.8)+(seep*0.2);
                    co4=(co4*0.8)+(seep*0.2);
                    co5=(co5*0.8)+(seep*0.2);
                    co6=(co6*0.8)+(seep*0.2);
                    postupdate={usn:data.usn,co1p:co1,co2p:co2,co3p:co3,co4p:co4,co5p:co5,co6p:co6};
                    postarray.push(postupdate);
                    update=`Update exp_student_co SET sco1p='${co1}',sco2p='${co2}',sco3p='${co3}',sco4p='${co4}',sco5p='${co5}',sco6p='${co6}' where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                    db.query(update,(erru,resultu)=>{
                        if(erru)
                        throw erru;
                    })
                })
                
                
            })
        }
        
        let sco1=0,sco2=0,sco3=0,sco4=0,sco5=0,sco6=0,sn=0;
        selectfinal=`Select * from exp_student_co where subject_code='${req.session.crs}' `;
        db.query(selectfinal,(errfinal,resultfinal)=>{
            if(errfinal){
                res.render('error.ejs',{err:errfinal});
                return;
            }
            
            dictfinal=JSON.parse(JSON.stringify(resultfinal));
            dictfinal.forEach((dataeach) => {
                sco1+=dataeach.sco1p;
                sco2+=dataeach.sco2p;
                sco3+=dataeach.sco3p;
                sco4+=dataeach.sco4p;
                sco5+=dataeach.sco5p;
                sco6+=dataeach.sco6p;
                sn++;
            });
            console.log(sn);
            postsub={co1p:(sco1/sn),co2p:(sco2/sn),co3p:(sco3/sn),co4p:(sco4/sn),co5p:(sco5/sn),co6p:(sco6/sn)};
            updatefinal=`Update exp_subject_co SET sco1p='${sco1/sn}',sco2p='${sco2/sn}',sco3p='${sco3/sn}',sco4p='${sco4/sn}',sco5p='${sco5/sn}',sco6p='${sco6/sn}' where subject_code='${req.session.crs}' `;
            db.query(updatefinal,(errufinal,resultufinal)=>{
                if(errufinal){
                    res.render('error.ejs',{err:errufinal});
                    return;
                }
                res.render('courseoutcome.ejs',{student:postarray,total:postsub,title:'CIE & SEE COURSE OUTCOME',co:req.session.co});
                postarray=[];
                postsub={};
            })
        })
    })
})
})

module.exports=router;