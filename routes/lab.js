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
    res.render('upload.ejs', { url: '/lab',back:'/index',download:'/LAB DETAILS.csv'})
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
            for (var i = 14; i < data.length; i++) {
                let row = data[i].split(',');
                if(row[0]==''||row[0]==' ')
                break;
                 if (row[75] === '#DIV/0!')
                     row[75] = 0;
                 if (row[76] === '#DIV/0!' )
                     row[76] = 0;
                 if (row[77] ==='#DIV/0!' )
                     row[77] = 0;
                 if (row[78] === '#DIV/0!' )
                     row[78] = 0;
                 if (row[79] === '#DIV/0!' )
                    row[79] = 0;
                 if (row[80] === '#DIV/0!' )
                    row[80] = 0;

                    d=`Delete from exp_lab_co where usn='${row[1]}' and subject_code='${req.session.crs}' `;
                    db.query(d,(err,result)=>{
                        if(err)
                        throw err;
                    })
                    post={usn:row[1],subject_code:req.session.crs,
                        co1p:row[75]?row[75]:0,co2p:row[76]?row[76]:0,co3p:row[77]?row[77]:0,co4p:row[78]?row[78]:0,co5p:row[79]?row[79]:0,co6p:row[80]?row[80]:0
                    };
                    console.log(post)
                s=`Insert into exp_lab_co SET ?`;
                db.query(s,post,(err,result)=>{
                    if(err)
                    throw err;
                })
            }
        })
    }
    res.render('assignupload.ejs');
})

module.exports=router;