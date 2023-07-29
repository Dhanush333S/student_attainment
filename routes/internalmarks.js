const express = require('express');
const session = require('express-session');
const upload = require('express-fileupload');
const fs = require('fs');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
var db = require('./connection');
const { resume } = require('./connection');
var filename = "";

router.use(upload());
router.get('/',(req,res)=>{
    res.render('upload.ejs',{url:'/internalmarks',download:'/INTERNAL MARKS.csv',back:'/index',lab:{one:100,two:150}});
})

router.post('/',(req,res)=>{
    var row = [];
    if (req.files) {
        var file = req.files.img;
        filename = file.name;
        console.log(filename);

        file.mv('./uploads/' + filename, function (err) {
            if (err)
                throw err;
            var data = fs.readFileSync('./uploads/' + filename, 'utf-8');
            data = data.split("\r\n");
            var max=Number(req.body.lab);
            for (var i = 1; i < data.length; i++) {
                row = data[i].split(',');
                if(row[0]==''||row[0]==' ')
                break;
                var update;
                let cie=row[1];
                if(cie=='NSSR'|| cie=='NSAR')
                update=`Update exp_student_co SET internal_marks='0',internal_grade='${cie}' where usn='${row[0]}' and subject_code='${req.session.crs}' `;
                else{
                    var g,p;
                    p=cie*100/max;
                    if(p>=90)
                    g='O';
                    else if(p>=80)
                    g='A+';
                    else if(p>=70)
                    g='A';
                    else if(p>=60)
                    g='B+';
                    else if(p>=55)
                    g='B';
                    else if(p>=50)
                    g='C';
                    else if(p>=80)
                    g='P';
                    else 
                    g='F';
                    update=`Update exp_student_co SET internal_marks='${cie}',internal_grade='${g}' where usn='${row[0]}' and subject_code='${req.session.crs}'`;
                }
                db.query(update,(erru,resultu)=>{
                    if(erru)
                    throw erru;
                })
            }
        })
        res.render('assignupload.ejs')
    }
})

module.exports=router;