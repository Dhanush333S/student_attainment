const express=require('express');
const session=require('express-session');
const upload=require('express-fileupload');
const fs=require('fs');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');
var filename="";

router.use(upload());
router.get('/',(req,res)=>{
    res.render('upload.ejs',{download:"/formats/student details.csv",url:'/stddetails',back:'/index'})
});

router.post('/',(req,res)=>{
    var row=[];
    if(req.files){   
        var file=req.files.img;
        filename=file.name;
        console.log(filename);

        file.mv('./uploads/'+filename,function(err){
            if (err){
                res.render('error.ejs',{err:err});
                return;
            }

            var data=fs.readFileSync('./uploads/'+filename,'utf-8');
            data = data.split("\r\n");
            for (var i=1;i<data.length;i++){
                row=data[i].split(',');
                if(row[0]==''||row[0]==' ')
                break;
                d=`Delete from exp_student where usn='${row[0]}' `
                db.query(d,(err,result)=>{
                    if (err)
                    throw err;
                })
                post={usn:row[0],department_name:row[1],name:row[2],semester:row[3]}
                s=`Insert into exp_student SET ?`
                db.query(s,post,(err,result)=>{
                    if (err)
                    throw err;
                })
            }
        })
    }
    res.render('assignupload.ejs');
})

module.exports=router;