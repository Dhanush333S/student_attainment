const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

router.get('/',(req,res)=>{
    res.render('crsendsrvy.ejs')
})

router.post('/',(req,res)=>{
 var q1e=Number(req.body.q1e);
 var q1vg=Number(req.body.q1vg);
 var q1g=Number(req.body.q1g);
 var q1s=Number(req.body.q1s);
 var q1p=Number(req.body.q1p);
 var q1co=Number(req.body.q1co);

 var q2e=Number(req.body.q2e);
 var q2vg=Number(req.body.q2vg);
 var q2g=Number(req.body.q2g);
 var q2s=Number(req.body.q2s);
 var q2p=Number(req.body.q2p);
 var q2co=Number(req.body.q2co);

 var q3e=Number(req.body.q3e);
 var q3vg=Number(req.body.q3vg);
 var q3g=Number(req.body.q3g);
 var q3s=Number(req.body.q3s);
 var q3p=Number(req.body.q3p);
 var q3co=Number(req.body.q3co);

 var q4e=Number(req.body.q4e);
 var q4vg=Number(req.body.q4vg);
 var q4g=Number(req.body.q4g);
 var q4s=Number(req.body.q4s);
 var q4p=Number(req.body.q4p);
 var q4co=Number(req.body.q4co);

 var q5e=Number(req.body.q5e);
 var q5vg=Number(req.body.q5vg);
 var q5g=Number(req.body.q5g);
 var q5s=Number(req.body.q5s);
 var q5p=Number(req.body.q5p);
 var q5co=Number(req.body.q5co);

 var q6e=Number(req.body.q6e);
 var q6vg=Number(req.body.q6vg);
 var q6g=Number(req.body.q6g);
 var q6s=Number(req.body.q6s);
 var q6p=Number(req.body.q6p);
 var q6co=Number(req.body.q6co);

 var q7e=Number(req.body.q7e);
 var q7vg=Number(req.body.q7vg);
 var q7g=Number(req.body.q7g);
 var q7s=Number(req.body.q7s);
 var q7p=Number(req.body.q7p);
 var q7co=Number(req.body.q7co);

 var q8e=Number(req.body.q8e);
 var q8vg=Number(req.body.q8vg);
 var q8g=Number(req.body.q8g);
 var q8s=Number(req.body.q8s);
 var q8p=Number(req.body.q8p);
 var q8co=Number(req.body.q8co);

 var q9e=Number(req.body.q9e);
 var q9vg=Number(req.body.q9vg);
 var q9g=Number(req.body.q9g);
 var q9s=Number(req.body.q9s);
 var q9p=Number(req.body.q9p);
 var q9co=Number(req.body.q9co);

 var q10e=Number(req.body.q10e);
 var q10vg=Number(req.body.q10vg);
 var q10g=Number(req.body.q10g);
 var q10s=Number(req.body.q10s);
 var q10p=Number(req.body.q10p);
 var q10co=Number(req.body.q10co);

 var q11e=Number(req.body.q11e);
 var q11vg=Number(req.body.q11vg);
 var q11g=Number(req.body.q11g);
 var q11s=Number(req.body.q11s);
 var q11p=Number(req.body.q11p);
 var q11co=Number(req.body.q11co);

 var q12e=Number(req.body.q12e);
 var q12vg=Number(req.body.q12vg);
 var q12g=Number(req.body.q12g);
 var q12s=Number(req.body.q12s);
 var q12p=Number(req.body.q12p);
 var q12co=Number(req.body.q12co);

 var q13e=Number(req.body.q13e);
 var q13vg=Number(req.body.q13vg);
 var q13g=Number(req.body.q13g);
 var q13s=Number(req.body.q13s);
 var q13p=Number(req.body.q13p);
 var q13co=Number(req.body.q13co);

 var q14e=Number(req.body.q14e);
 var q14vg=Number(req.body.q14vg);
 var q14g=Number(req.body.q14g);
 var q14s=Number(req.body.q14s);
 var q14p=Number(req.body.q14p);
 var q14co=Number(req.body.q14co);

 var q15e=Number(req.body.q15e);
 var q15vg=Number(req.body.q15vg);
 var q15g=Number(req.body.q15g);
 var q15s=Number(req.body.q15s);
 var q15p=Number(req.body.q15p);
 var q15co=Number(req.body.q15co);

var n=q1e+q1vg+q1g+q1s+q1p;
console.log(q1e+q1vg+q1g+q1s+q1p)
var q1=(q1e*10)+(q1vg*8)+(q1g*6)+(q1s*4)+(q1p*2);
q1=(q1/n); 
var q2=(q2e*10)+(q2vg*8)+(q2g*6)+(q2s*4)+(q2p*2);
q2=(q2/n); 
var q3=(q3e*10)+(q3vg*8)+(q3g*6)+(q3s*4)+(q3p*2);
q3=(q3/n); 
var q4=(q4e*10)+(q4vg*8)+(q4g*6)+(q4s*4)+(q4p*2);
q4=(q4/n); 
var q5=(q5e*10)+(q5vg*8)+(q5g*6)+(q5s*4)+(q5p*2);
q5=(q5/n); 
var q6=(q6e*10)+(q6vg*8)+(q6g*6)+(q6s*4)+(q6p*2);
q6=(q6/n); 
var q7=(q7e*10)+(q7vg*8)+(q7g*6)+(q7s*4)+(q7p*2);
q7=(q7/n); 
var q8=(q8e*10)+(q8vg*8)+(q8g*6)+(q8s*4)+(q8p*2);
q8=(q8/n); 
var q9=(q9e*10)+(q9vg*8)+(q9g*6)+(q9s*4)+(q9p*2);
q9=(q9/n); 
var q10=(q10e*10)+(q10vg*8)+(q10g*6)+(q10s*4)+(q10p*2);
q10=(q10/n); 
var q11=(q11e*10)+(q11vg*8)+(q11g*6)+(q11s*4)+(q11p*2);
q11=(q11/n); 
var q12=(q12e*10)+(q12vg*8)+(q12g*6)+(q12s*4)+(q12p*2);
q12=(q12/n); 
var q13=(q13e*10)+(q13vg*8)+(q13g*6)+(q13s*4)+(q13p*2);
q13=(q13/n); 
var q14=(q14e*10)+(q14vg*8)+(q14g*6)+(q14s*4)+(q14p*2);
q14=(q14/n); 
var q15=(q15e*10)+(q15vg*8)+(q15g*6)+(q15s*4)+(q15p*2);
q15=(q15/n); 
console.log(q1e)
console.log('n'+n)
var a=[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15];
console.log(a[0])
var b=[q1co,q2co,q3co,q4co,q5co,q6co,q7co,q8co,q9co,q10co,q11co,q12co,q13co,q14co,q15co];
var co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;
var co1n=0,co2n=0,co3n=0,co4n=0,co5n=0,co6n=0;
for(var i=0;i<15;i++){
	if(b[i]==1){
		co1+=a[i];
		co1n++;
	}
	else if(b[i]==2){
		co2+=a[i];
		co2n++;
	}
	else if(b[i]==3){
		co3+=a[i];
		co3n++;
	}
	else if(b[i]==4){
		co4+=a[i];
		co4n++;
	}
    else if(b[i]==5){
		co5+=a[i];
		co5n++;
	}
    else if(b[i]==6){
		co6+=a[i];
		co6n++;
	}	
    else;
}
if(co1n != 0)
co1=10*co1/co1n;
if(co2n != 0)
co2=10*co2/co2n;
if(co3n != 0)
co3=10*co3/co3n;
if(co4n != 0)
co4=10*co4/co4n;
if(co5n != 0)
co5=10*co5/co5n;
if(co6n != 0)
co6=10*co6/co6n;
post={
    subject_code:req.session.crs,
    co1p:co1,co2p:co2,co3p:co3,co4p:co4,co5p:co5,co6p:co6
}
d=`Delete from exp_crsendsurvey where subject_code='${req.session.crs}' `;
db.query(d,(err,result)=>{
    if(err)
    throw err;
})
s=`Insert into exp_crsendsurvey SET ?`;
db.query(s,post,(err,result)=>{
    if (err)
    throw err;
})
res.render('assignupload.ejs')

})

module.exports=router;