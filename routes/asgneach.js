const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

var usn='';
var n=1;
var post={};

router.get('/:usn',(req,res)=>{
    res.render('asgneach.ejs',{n:1});
    usn=req.params.usn;
})

router.post('/',(req,res)=>{
    n=req.body.phase;
    res.render('asgneach.ejs',{n:req.body.phase});
})

router.post('/upload',(req,res)=>{
    console.log(usn);
    d=`Delete from exp_assignment where usn='${usn}' and subject_code='${req.session.crs}' `
    db.query(d,(err,result)=>{
        if (err){
            res.render('error.ejs',{err:err});
            return;
        }
    })
    if(n==1){
        post={usn:usn,subject_code:req.session.crs,
            m11:req.body.m11,m21:req.body.m21,m31:req.body.m31,m41:req.body.m41,m51:req.body.m51,m61:req.body.m61
        }
    }
    if(n==2){
        post={usn:usn,subject_code:req.session.crs,
            m11:req.body.m11,m21:req.body.m21,m31:req.body.m31,m41:req.body.m41,m51:req.body.m51,m61:req.body.m61,
            m12:req.body.m12,m22:req.body.m22,m32:req.body.m32,m42:req.body.m42,m52:req.body.m52,m62:req.body.m62
        }
    }
    if(n==3){
        post={usn:usn,subject_code:req.session.crs,
            m11:req.body.m11,m21:req.body.m21,m31:req.body.m31,m41:req.body.m41,m51:req.body.m51,m61:req.body.m61,
            m12:req.body.m12,m22:req.body.m22,m32:req.body.m32,m42:req.body.m42,m52:req.body.m52,m62:req.body.m62,
            m13:req.body.m13,m23:req.body.m23,m33:req.body.m33,m43:req.body.m43,m53:req.body.m53,m63:req.body.m63
        }
    }
    if(n==4){
        post={usn:usn,subject_code:req.session.crs,
            m11:req.body.m11,m21:req.body.m21,m31:req.body.m31,m41:req.body.m41,m51:req.body.m51,m61:req.body.m61,
            m12:req.body.m12,m22:req.body.m22,m32:req.body.m32,m42:req.body.m42,m52:req.body.m52,m62:req.body.m62,
            m13:req.body.m13,m23:req.body.m23,m33:req.body.m33,m43:req.body.m43,m53:req.body.m53,m63:req.body.m63,
            m14:req.body.m14,m24:req.body.m24,m34:req.body.m34,m44:req.body.m44,m54:req.body.m54,m64:req.body.m64
        }
    }
    s="Insert into exp_assignment Set ? ";
    console.log(post);
     db.query(s,post,(err,result)=>{
          if(err){
            res.render('error.ejs',{err:err});
            return;
        }
      })
    var co1=0,co2=0,co3=0,co4=0,co5=0,co6=0,total=0,co1p=0,co2p=0,co3p=0,co4p=0,co5p=0,co6p=0;
    selecta=`Select * from exp_assignment_mapping where subject_code='${req.session.crs}' `;
    selecta1=`Select * from exp_assignment where usn='${usn}' and subject_code='${req.session.crs}' `;

    db.query(selecta1,(err1,result1)=>{
        if(err1){
            res.render('error.ejs',{err:err1});
            return;
        }
        if(result1.length<1){
            res.render('error.ejs',{err:'Fill in the Assignment Mapping !!'});
            return;
        }
        let dict1=JSON.parse(JSON.stringify(result1));
        let data1=Object.values(dict1[0]);
        db.query(selecta,(err,result)=>{
            if (err){
                res.render('error.ejs',{err:err});
                return;
            }
            if(result.length<1){
                res.render('error.ejs',{err:'Fill in the Assignment Mapping !!'});
                return;
            }
            let dict=JSON.parse(JSON.stringify(result));
            let data=Object.values(dict[0]);
            for(var i=2;i<26;i++){
                if(data[i]=='1')
                co1+=data1[i+1];
                if(data[i]=='2')
                co2+=data1[i+1];
                if(data[i]=='3')
                co3+=data1[i+1];
                if(data[i]=='4')
                co4+=data1[i+1];
                if(data[i]=='5')
                co5+=data1[i+1];
                if(data[i]=='6')
                co6+=data1[i+1];

                total+=data1[i+1];
           }
           co1p=co1/data[50];
           co2p=co2/data[51];
           co3p=co3/data[52];
           co4p=co4/data[53];
           co5p=co5/data[54];
           co6p=co6/data[55];
           del=`Delete from exp_assignment_co where usn='${usn}' and subject_code='${req.session.crs}' `;
           db.query(del,(err,result)=>{
            if (err){
                res.render('error.ejs',{err:err});
                return;
            }
           })
           insert={usn:usn,subject_code:req.session.crs,
            co1:co1,co2:co2,co3:co3,co4:co4,co5:co5,co6:co6,
            co1p:co1p*100,co2p:co2p*100,co3p:co3p*100,co4p:co4p*100,co5p:co5p*100,co6p:co6p*100,
            asg:total
           }
           final="Insert into exp_assignment_co SET ? ";
           db.query(final,insert,(err,result)=>{
                if (err){
                    res.render('error.ejs',{err:err});
                    return;
                }
                res.render('assignupload.ejs',{back:'/asgnstudent'})
           })
        })
    })
})


module.exports=router;