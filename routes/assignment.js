const express=require('express');
const session = require('express-session');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');
var phase=1;
var post={};
var co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;

router.get('/',(req,res)=>{
    res.render('assignment.ejs',{n:"1"});
});
router.post('/',(req,res)=>{
    phase=req.body.phase;
    res.render('assignment.ejs',{n:req.body.phase ,time:0});
});
router.post('/upload',(req,res)=>{
    console.log(req.session.crs)
    if(phase==1){
        post={subject_code:`${req.session.crs}`,
            r11:req.body.r11,r21:req.body.r21,r31:req.body.r31,r41:req.body.r41,r51:req.body.r51,r61:req.body.r61,
            mr11:req.body.mr11,mr21:req.body.mr21,mr31:req.body.mr31,mr41:req.body.mr41,mr51:req.body.mr51,mr61:req.body.mr61
        };
    }
    else if(phase==2){
        post={subject_code:`${req.session.crs}`,
            r11:req.body.r11,r21:req.body.r21,r31:req.body.r31,r41:req.body.r41,r51:req.body.r51,r61:req.body.r61,
            r12:req.body.r12,r22:req.body.r22,r32:req.body.r32,r42:req.body.r42,r52:req.body.r52,r62:req.body.r62,
            mr11:req.body.mr11,mr21:req.body.mr21,mr31:req.body.mr31,mr41:req.body.mr41,mr51:req.body.mr51,mr61:req.body.mr61,
            mr12:req.body.mr12,mr22:req.body.mr22,mr32:req.body.mr32,mr42:req.body.mr42,mr52:req.body.mr52,mr62:req.body.mr62
        };
    }
    else if(phase==3){
        post={subject_code:`${req.session.crs}`,
            r11:req.body.r11,r21:req.body.r21,r31:req.body.r31,r41:req.body.r41,r51:req.body.r51,r61:req.body.r61,
            r12:req.body.r12,r22:req.body.r22,r32:req.body.r32,r42:req.body.r42,r52:req.body.r52,r62:req.body.r62,
            r13:req.body.r13,r23:req.body.r23,r33:req.body.r33,r43:req.body.r43,r53:req.body.r53,r63:req.body.r63,
            mr11:req.body.mr11,mr21:req.body.mr21,mr31:req.body.mr31,mr41:req.body.mr41,mr51:req.body.mr51,mr61:req.body.mr61,
            mr12:req.body.mr12,mr22:req.body.mr22,mr32:req.body.mr32,mr42:req.body.mr42,mr52:req.body.mr52,mr62:req.body.mr62,
            mr13:req.body.mr13,mr23:req.body.mr23,mr33:req.body.mr33,mr43:req.body.mr43,mr53:req.body.mr53,mr63:req.body.mr63
        };
    }
    else if(phase==4){
        post={subject_code:`${req.session.crs}`,
            r11:req.body.r11,r21:req.body.r21,r31:req.body.r31,r41:req.body.r41,r51:req.body.r51,r61:req.body.r61,
            r12:req.body.r12,r22:req.body.r22,r32:req.body.r32,r42:req.body.r42,r52:req.body.r52,r62:req.body.r62,
            r13:req.body.r13,r23:req.body.r23,r33:req.body.r33,r43:req.body.r43,r53:req.body.r53,r63:req.body.r63,
            r14:req.body.r14,r24:req.body.r24,r34:req.body.r34,r44:req.body.r44,r54:req.body.r54,r64:req.body.r64,
            mr11:req.body.mr11,mr21:req.body.mr21,mr31:req.body.mr31,mr41:req.body.mr41,mr51:req.body.mr51,mr61:req.body.mr61,
            mr12:req.body.mr12,mr22:req.body.mr22,mr32:req.body.mr32,mr42:req.body.mr42,mr52:req.body.mr52,mr62:req.body.mr62,
            mr13:req.body.mr13,mr23:req.body.mr23,mr33:req.body.mr33,mr43:req.body.mr43,mr53:req.body.mr53,mr63:req.body.mr63,
            mr14:req.body.mr14,mr24:req.body.mr24,mr34:req.body.mr34,mr44:req.body.mr44,mr54:req.body.mr54,mr64:req.body.mr64
        };
    }
    s0=`Delete from exp_assignment_mapping where subject_code='${req.session.crs}'`;
    db.query(s0,(err,result)=>{
        if (err)
        throw err;
    })
    s="Insert into exp_assignment_mapping Set ?";
    console.log(post);
     db.query(s,post,(err,result)=>{
          if(err)
          throw err;
      })
      s1=`Select * from exp_assignment_mapping where subject_code='${req.session.crs}'`;
      db.query(s1,(err,result)=>{
          if(err)
          throw err;
          console.log(result)
          let dict=JSON.parse(JSON.stringify(result));
          let data=Object.values(dict[0]);
           for(var i=2;i<26;i++){
                   if(data[i]=='1')
                   co1+=data[i+24];
                   if(data[i]=='2')
                   co2+=data[i+24];
                   if(data[i]=='3')
                   co3+=data[i+24];
                   if(data[i]=='4')
                   co4+=data[i+24];
                   if(data[i]=='5')
                   co5+=data[i+24];
                   if(data[i]=='6')
                   co6+=data[i+24];
                }
                console.log(`${co1}  ${co2} ${co3} ${co4} ${co5} ${co6}`)
                s2=`UPDATE exp_assignment_mapping SET co1='${co1}',co2='${co2}',co3='${co3}',co4='${co4}',co5='${co5}',co6='${co6}' where subject_code='${req.session.crs}'`;
                db.query(s2,(err,result)=>{
                   if (err)
                   throw err;
                   co1=0,co2=0,co3=0,co4=0,co5=0,co6=0;
                });
        //  For resetting the auto insenatation:
        //  Set @num :=1;
        //  Update exp_assignment_mapping set id= @num :=(@num+1);
        //  Alter Table exp_assignment_mapping Auto_Increment=1;

      })
    res.render('assignupload.ejs');
})


module.exports=router;