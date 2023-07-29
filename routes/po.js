const express = require('express');
const session = require('express-session');
const upload = require('express-fileupload');
const fs = require('fs');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
var db = require('./connection');
var filename = "";

router.use(upload());
router.get('/', (req, res) => {
    res.render('upload.ejs', { url: '/pocalculation',back:'/index',download:'/PO CALCULATION.csv'})
})

router.post('/', (req, res) => {
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
                update=`Update exp_level SET po1='${row[1]?row[1]:0}',po2='${row[2]?row[2]:0}',po3='${row[3]?row[3]:0}',po4='${row[4]?row[4]:0}',po5='${row[5]?row[5]:0}',po6='${row[6]?row[6]:0}',po7='${row[7]?row[7]:0}',po8='${row[8]?row[8]:0}',po9='${row[9]?row[9]:0}',po10='${row[10]?row[10]:0}',po11='${row[11]?row[11]:0}',po12='${row[12]?row[12]:0}',pso1='${row[13]?row[13]:0}',pso2='${row[14]?row[14]:0}',year='${row[15]}' where subject_code='${row[0]}'`;
                db.query(update,(err)=>{
                    if(err){
                        res.render('error.ejs',{err:err});
                        return;
                    }
                })
            }
        })
    }
    res.render('assignupload.ejs');
})

module.exports=router;