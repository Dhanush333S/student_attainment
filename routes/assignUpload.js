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
    res.render('upload.ejs', { url: '/assignUpload', back: '/index', download: '/ASSIGNMENT_UPLOAD.csv' });
})

router.post('/', (req, res) => {
    if (req.files) {
        var file = req.files.img;
        filename = file.name;
        console.log(filename);
    }
    file.mv('./uploads/' + filename, function (err) {
        if (err)
            throw err;
        var data = fs.readFileSync('./uploads/' + filename, 'utf-8');
        data = data.split("\r\n");
        for (var i = 3; i < data.length; i++) {
            let row = data[i].split(',');
            if (row[0] == '' || row[0] == ' ')
                break;
            row.forEach((ele, index) => {
                if (ele === '')
                    row[index] = 0;
            });
            d = `Delete from exp_assignment where usn='${row[0]}' and subject_code='${req.session.crs}' `
            db.query(d, (err, result) => {
                if (err) {
                    res.render('error.ejs', { err: err });
                    return;
                }
            })
            post = {
                usn: row[0], subject_code: req.session.crs,
                m11: row[1], m21: row[2], m31: row[3], m41: row[4], m51: row[5], m61: row[6],
                m12: row[7], m22: row[8], m32: row[9], m42: row[10], m52: row[11], m62: row[12],
                m13: row[13], m23: row[14], m33: row[15], m43: row[16], m53: row[17], m63: row[18],
                m14: row[19], m24: row[20], m34: row[21], m44: row[22], m54: row[23], m64: row[24]
            }
            s = "Insert into exp_assignment Set ? ";
            db.query(s, post, (err, result) => {
                if (err) {
                    res.render('error.ejs', { err: err });
                    return;
                }
            })
            let co1 = 0, co2 = 0, co3 = 0, co4 = 0, co5 = 0, co6 = 0, total = 0, co1p = 0, co2p = 0, co3p = 0, co4p = 0, co5p = 0, co6p = 0;
            selecta = `Select * from exp_assignment_mapping where subject_code='${req.session.crs}' `;
            selecta1 = `Select * from exp_assignment where usn='${row[0]}' and subject_code='${req.session.crs}' `;
            db.query(selecta1, (err1, result1) => {
                if (err1) {
                    res.render('error.ejs', { err: err1 });
                    return;
                }
                if (result1.length < 1) {
                    res.render('error.ejs', { err: 'Fill in the Assignment Mapping !!' });
                    return;
                }
                let dict1 = JSON.parse(JSON.stringify(result1));
                let data1 = Object.values(dict1[0]);
                db.query(selecta, (err, result) => {
                    if (err) {
                        res.render('error.ejs', { err: err });
                        return;
                    }
                    if (result.length < 1) {
                        res.render('error.ejs', { err: 'Fill in the Assignment Mapping !!' });
                        return;
                    }
                    let dict = JSON.parse(JSON.stringify(result));
                    let data = Object.values(dict[0]);
                    for (var i = 2; i < 26; i++) {
                        if (data[i] == '1')
                            co1 += data1[i + 1];
                        if (data[i] == '2')
                            co2 += data1[i + 1];
                        if (data[i] == '3')
                            co3 += data1[i + 1];
                        if (data[i] == '4')
                            co4 += data1[i + 1];
                        if (data[i] == '5')
                            co5 += data1[i + 1];
                        if (data[i] == '6')
                            co6 += data1[i + 1];

                        total += data1[i + 1];
                    }
                    co1p = co1 / data[50];
                    co2p = co2 / data[51];
                    co3p = co3 / data[52];
                    co4p = co4 / data[53];
                    co5p = co5 / data[54];
                    co6p = co6 / data[55];
                    del = `Delete from exp_assignment_co where usn='${row[0]}' and subject_code='${req.session.crs}' `;
                    db.query(del, (err, result) => {
                        if (err) {
                            res.render('error.ejs', { err: err });
                            return;
                        }
                    })
                    insert = {
                        usn: row[0], subject_code: req.session.crs,
                        co1: co1, co2: co2, co3: co3, co4: co4, co5: co5, co6: co6,
                        co1p: co1p * 100, co2p: co2p * 100, co3p: co3p * 100, co4p: co4p * 100, co5p: co5p * 100, co6p: co6p * 100,
                        asg: total
                    }
                    final = "Insert into exp_assignment_co SET ? ";
                    db.query(final, insert, (err, result) => {
                        if (err) {
                            res.render('error.ejs', { err: err });
                            return;
                        }
                        co1 = 0, co2 = 0, co3 = 0, co4 = 0, co5 = 0, co6 = 0, total = 0, co1p = 0, co2p = 0, co3p = 0, co4p = 0, co5p = 0, co6p = 0;
                    })
                })
            })
        }
    })
    res.render('assignupload.ejs');
})

module.exports = router;