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
    res.render('upload.ejs',{download:"/COURSE DETAILS.csv",url:'/subdetails',back:'/index'})
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
                d=`Delete from exp_subject where subject_code='${row[1]}' `;
                db.query(d,(errD,resultD)=>{
                    if(errD){
                        res.render('error.ejs',{err:errD});
                        return;
                    }
                })
                
                post={subject_name:row[0],subject_code:row[1],semester_id:row[2],department_id:row[3],co:row[4]}
                insert=`Insert into exp_subject SET ?`;
                db.query(insert,post,(errInsert,resultInsert)=>{
                    if(errInsert){
                        res.render('error.ejs',{err:errInsert});
                        return;
                    }
                })
            }
            res.render('assignupload.ejs')
        });
    }
});


module.exports=router;