const express = require('express');
const session = require('express-session');
const upload = require('express-fileupload');
const fs = require('fs');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
var db = require('./connection');
var filename = "";

router.use(upload());
router.get('/',(req,res)=>{
    res.render('upload.ejs',{url:'/seegrades',download:'/SEE GRADE.csv',back:'/index',lab:{one:200,two:300}});
})

router.post('/',(req,res)=>{
    if (req.files) {
        var file = req.files.img;
        filename = file.name;
        console.log(filename);

        file.mv('./uploads/' + filename, function (err) {
            if (err)
                throw err;
            var data = fs.readFileSync('./uploads/' + filename, 'utf-8');
            data = data.split("\r\n");
            for (var i = 1; i < data.length; i++) {
                let row = data[i].split(',');
                if(row[0]==''||row[0]==' ')
                break;
                select=`Select * from exp_student_co where usn='${row[0]}' and subject_code='${req.session.crs}' `;
                db.query(select,(errs,results)=>{
                    if (errs)
                    throw errs;
                    let dict=JSON.parse(JSON.stringify(results));
                    let datas=[];
                    if(dict.length>0)
                    datas=Object.values(dict[0]);
                    console.log(datas[9])
                    let max=Number(req.body.lab);
                    console.log(max)
                    var gp;
                    console.log(row[1])
                    if(row[1]==='O')
                    gp=10;
                    else if(row[1]==='A+')
                    gp=9;
                    else if(row[1]==='A')
                    gp=8;
                    else if(row[1]==='B+')
                    gp=7;
                    else if(row[1]==='B')
                    gp=6;
                    else if(row[1]==='C')
                    gp=5;
                    else if(row[1]==='P')
                    gp=4;
                    else
                    gp=0;
                    console.log(gp)
                    let em=((gp-0.75)/10)*max;
                    em=Math.round(em);
                    var sm=em-datas[9];
                    if(em<0){
                        em=0;
                        sm=0;
                    }
                    update=`Update exp_student_co SET sem_end_grade='${row[1]}',equivaqlent_marks='${em}',sem_end_marks='${sm}' where subject_code='${req.session.crs}' and usn='${row[0]}' `;
                    console.log(update)
                     db.query(update,(erru,resultu)=>{
                         if(erru)
                         throw erru;
                     })
                })
            }
        })
    }
    res.render('assignupload.ejs');
});

module.exports=router;