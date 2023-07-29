const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

let postarray=[];
let postsub={};

router.get('/',(req,res)=>{
    crsendsurvey=`Select * from exp_crsendsurvey where subject_code='${req.session.crs}' `;
    db.query(crsendsurvey,(errsurvey,resultsurvey)=>{
        if(errsurvey)
        throw errsurvey;
        let dictsurvey=JSON.parse(JSON.stringify(resultsurvey));
        let datasurvey=Object.values(dictsurvey[0]);
        student=`Select usn from exp_student where semester='${req.session.sem}' `;
        db.query(student,(errstud,resultstud)=>{
            if(errstud)
            throw errstud;
            let dictstud=JSON.parse(JSON.stringify(resultstud))
            dictstud.forEach((data) => {
                studentco=`Select * from exp_student_co where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                db.query(studentco,(errsco,resultsco)=>{
                    if(errsco)
                    throw errsco;
                    let co1=0,co2=0,co3=0,co4=0,co5=0,co6=0,average=0;
                    let dict=JSON.parse(JSON.stringify(resultsco));
                    co1=dict[0].sco1p;
	                co2=dict[0].sco2p;
	                co3=dict[0].sco3p;
	                co4=dict[0].sco4p;
                    co5=dict[0].sco5p;
                    co6=dict[0].sco6p;
	                co1=(co1*0.9)+(datasurvey[2]*0.1);
	                co2=(co2*0.9)+(datasurvey[3]*0.1);
	                co3=(co3*0.9)+(datasurvey[4]*0.1);
	                co4=(co4*0.9)+(datasurvey[5]*0.1);
                    co5=(co5*0.9)+(datasurvey[6]*0.1);
                    co6=(co6*0.9)+(datasurvey[7]*0.1);
                    average=(co1+co2+co3+co4+co5+co6)/6;
                    postdi={usn:data.usn,co1p:co1,co2p:co2,co3p:co3,co4p:co4,co5p:co5,co6p:co6};
                    postarray.push(postdi)
                    update=`Update exp_student_co SET dico1p='${co1}', dico2p='${co2}',dico3p='${co3}',dico4p='${co4}',dico5p='${co5}',dico6p='${co6}',AvgDICO='${average}' where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                    db.query(update,(erru,resultu)=>{
                        if(erru)
                        throw erru;
                    })
                })
            });//for each


            let dico1=0,dico2=0,dico3=0,dico4=0,dico5=0,dico6=0,sn=0;
            select=`Select * from exp_student_co where subject_code='${req.session.crs}' `;
            db.query(select,(errfinal,resultfinal)=>{
                if(errfinal)
                throw errfinal;
                let dictfinal=JSON.parse(JSON.stringify(resultfinal));
                dictfinal.forEach((data) => {
                    datafinal=Object.values(data)
                    dico1+=datafinal[20];
                    dico2+=datafinal[21];
                    dico3+=datafinal[22];
                    dico4+=datafinal[23];
                    dico5+=datafinal[24];
                    dico6+=datafinal[25];
                    sn++;
                });
                postsub={co1p:(dico1/sn),co2p:(dico2/sn),co3p:(dico3/sn),co4p:(dico4/sn),co5p:(dico5/sn),co6p:(dico6/sn)};
                updatefinal=`Update exp_subject_co SET dico1p='${dico1/sn}',dico2p='${dico2/sn}',dico3p='${dico3/sn}',dico4p='${dico4/sn}',dico5p='${dico5/sn}',dico6p='${dico6/sn}' where subject_code='${req.session.crs}'  `;
                db.query(updatefinal,(errup,resultup)=>{
                    if(errup)
                    throw errup;
                    res.render('courseoutcome.ejs',{student:postarray,total:postsub,title:'Direct & Indirect CO Attainment',co:req.session.co});
                    postarray=[];
                    postsub={};
                })
            })
        })
    })
})

module.exports=router;