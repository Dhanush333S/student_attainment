const express=require('express');
const session = require('express-session');
const { createPoolCluster } = require('mysql');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

let postStudco={};
let postsub={};
let postarray=[];

router.get('/',(req,res)=>{
    s=`Select usn from exp_student where semester='${req.session.sem}' `;
    db.query(s,(err,result)=>{
        let dict = JSON.parse(JSON.stringify(result));
        for(var i=0;i<dict.length;i++){
            let data=dict[i];
            selectStudCo=`Select * from exp_student_co where usn='${data.usn}' and subject_code='${req.session.crs}' `;
            db.query(selectStudCo,(errsco,resultsco)=>{
                if(errsco)
                throw errsco;
                let dictselect=JSON.parse(JSON.stringify(resultsco));
                if(dictselect.length>0){
                    postarray.push(dictselect[0])
                }
                else{
                    internal=`Select * from exp_internal_co where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                    db.query(internal,(errInternal,resultInternal)=>{
                        if(errInternal)
                        throw errInternal;
                        let dictInternal=JSON.parse(JSON.stringify(resultInternal));
                        let dataInternal=[];
                        if(dictInternal.length>0)
                        dataInternal=Object.values(dictInternal[0]);
                    assignment=`Select * from exp_assignment_co where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                    console.log(assignment)
                    db.query(assignment,(errAssignment,resultAssignment)=>{
                        if(errAssignment)
                        throw errAssignment;
                        let dictAssignment=JSON.parse(JSON.stringify(resultAssignment));
                        let dataAssignment=[];
                        if(dictAssignment.length>0)
                        dataAssignment=Object.values(dictAssignment[0]);
                    lab=`Select * from exp_lab_co where usn='${data.usn}' and subject_code='${req.session.crs}' `;
                    console.log(lab)
                    db.query(lab,(errLab,resultLab)=>{
                        if(errLab)
                        throw errLab;
                        let dataLab=[];
                        let den;
                        if(resultLab.length>0){
                            let dictLab=JSON.parse(JSON.stringify(resultLab));
                            dataLab=Object.values(dictLab[0]);
                            den=3;
                            req.session.lab='Y';
                        }
                        else{
                            den=2;
                            req.session.lab='N';
                            for(var i=0;i<0;i++)
                            dataLab[i]=0;
                        }
                        var co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;
                        if(dataAssignment.length>0 && dataInternal.length>0){
                            co1=(dataAssignment[9]+dataInternal[15]+dataLab[3])/den;
                            co2=(dataAssignment[10]+dataInternal[16]+dataLab[4])/den;
                            co3=(dataAssignment[11]+dataInternal[17]+dataLab[5])/den;
                            co4=(dataAssignment[12]+dataInternal[18]+dataLab[6])/den;
                            co5=(dataAssignment[13]+dataInternal[19]+dataLab[7])/den;                            
                            co6=(dataAssignment[14]+dataInternal[20]+dataLab[8])/den;
                        }
                        postStudco={
                            usn:data.usn,subject_code:req.session.crs,co1p:co1,co2p:co2,co3p:co3,co4p:co4,co5p:co5,co6p:co6
                        };
                        postarray.push(postStudco);

                        insertStudco=`Insert into exp_student_co SET ?`;
                        db.query(insertStudco,postStudco,(errStudco,resultStudco)=>{
                            if(errStudco)
                            throw errStudco;
                        })
                    })
                    })
                })
                }//else
                
            })
        }//for
        var sco1=0,sco2=0,sco3=0,sco4=0,sco5=0,sco6=0,sn=0;
        selectSco=`Select * from exp_student_co where subject_code='${req.session.crs}' `;
        db.query(selectSco,(errfinal,resultfinal)=>{
            if(errfinal)
            throw errfinal;
            let dictfinal=JSON.parse(JSON.stringify(resultfinal));
            dictfinal.forEach((dicteach)=> {
                sco1+=dicteach.co1p;
                sco2+=dicteach.co2p;
                sco3+=dicteach.co3p;
                sco4+=dicteach.co4p;
                sco5+=dicteach.co5p;
                sco6+=dicteach.co6p;
                sn++;
            });
            di=`Delete from exp_subject_co where subject_code='${req.session.crs}' `;
            db.query(di,(errd,resultd)=>{
                if(errd)
                throw errd;
            })
            console.log(sn)
            if(sn!==0)
            postsub={subject_code:req.session.crs,co1p:(sco1/sn),co2p:(sco2/sn),co3p:(sco3/sn),co4p:(sco4/sn),co5p:(sco5/sn),co6p:(sco6/sn)
            };
            else
            postsub={subject_code:req.session.crs,co1p:0,co2p:0,co3p:0,co4p:0,co5p:0,co6p:0
            };
            insert=`Insert into exp_subject_co SET ?`;
            db.query(insert,postsub,(erri,resulti)=>{
                if(erri)
                throw erri;
            })
            res.render('courseoutcome.ejs',{student:postarray,total:postsub,title:'COURSE OUTCOME',co:req.session.co});
            postarray=[];
            postsub={};
        })
    })
})


module.exports=router;