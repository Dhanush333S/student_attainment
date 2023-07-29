const express = require('express');
const session = require('express-session');
const upload = require('express-fileupload');
const fs = require('fs');
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
var db = require('./connection');

router.use(upload());

router.get('/', (req, res) => {
    res.render('upload.ejs', { url: '/cieinput',download :'/STUDENT MARKS.csv',back:'/index' });
});

router.post('/', (req, res) => {
    if (req.files) {
        var file = req.files.img;
        var filename = file.name;
        console.log(filename);
    }

    file.mv('./uploads/' + filename, function (err) {
        if (err) {
            throw err
        }
        var datain = fs.readFileSync('./uploads/' + filename, 'utf-8');
        datain = datain.split("\r\n");
        for (var i = 3; i < datain.length; i++) {
            let row = datain[i].split(',');
            if (row[0] ===''||row[0]===' ')
                break;
            //Quiz 1
            d1 = `Delete from exp_quiz1 where subject_code='${req.session.crs}' and version='${(row[1] == '') ? 'A' : row[1]}' and usn='${row[0]}' `;
            db.query(d1, (err, result) => {
                if (err)
                    throw err;
            })
            post1 = {
                usn: row[0], version: (row[1] == '') ? 'A' : row[1], subject_code: req.session.crs,
                q1: (row[2] == '') ? '0' : row[2], q2: (row[3] == '') ? '0' : row[3], q3: (row[4] == '') ? '0' : row[4], q4: (row[5] == '') ? '0' : row[5], q5: (row[6] == '') ? '0' : row[6], q6: (row[7] == '') ? '0' : row[7],
                q7: (row[8] == '') ? '0' : row[8], q8: (row[9] == '') ? '0' : row[9]
                , q9: (row[10] == '') ? '0' : row[10], q10: (row[11] == '') ? '0' : row[11], q11: (row[12] == '') ? '0' : row[12], q12: (row[13] == '') ? '0' : row[13], q13: (row[14] == '') ? '0' : row[14], q14: (row[15] == '') ? '0' : row[15], q15: (row[16] == '') ? '0' : row[16]
            }
            s1 = `Insert into exp_quiz1 SET ?`;
            db.query(s1, post1, (err, result) => {
                if (err)
                    throw err;
            })
            //Quiz 2
            d2 = `Delete from exp_quiz2 where subject_code='${req.session.crs}' and version='${(row[35] == '') ? 'A' : row[35]}' and usn='${row[0]}' `;
            db.query(d2, (err, result) => {
                if (err)
                    throw err;
            })
            post2 = {
                usn: row[0], version: (row[35] == '') ? 'A' : row[35], subject_code: req.session.crs,
                q1: (row[36] == '') ? '0' : row[36], q2: (row[37] == '') ? '0' : row[37], q3: (row[38] == '') ? '0' : row[38], q4: (row[39] == '') ? '0' : row[39], q5: (row[40] == '') ? '0' : row[40], q6: (row[41] == '') ? '0' : row[41],
                q7: (row[42] == '') ? '0' : row[42], q8: (row[43] == '') ? '0' : row[43],
                q9: (row[44] == '') ? '0' : row[44], q10: (row[45] == '') ? '0' : row[45], q11: (row[46] == '') ? '0' : row[46], q12: (row[47] == '') ? '0' : row[47], q13: (row[48] == '') ? '0' : row[48], q14: (row[49] == '') ? '0' : row[49], q15: (row[50] == '') ? '0' : row[50]
            }
            s2 = `Insert into exp_quiz2 SET ?`;
            db.query(s2, post2, (err, result) => {
                if (err)
                    throw err;
            })
            //Quiz 3
            d3 = `Delete from exp_quiz3 where subject_code='${req.session.crs}' and version='${(row[69] == '') ? 'A' : row[69]}' and usn='${row[0]}'`;
            db.query(d3, (err, result) => {
                if (err)
                    throw err;
            })
            post3 = {
                usn: row[0], version: (row[69] == '') ? 'A' : row[69], subject_code: req.session.crs,
                q1: (row[70] == '') ? '0' : row[70], q2: (row[71] == '') ? '0' : row[71], q3: (row[72] == '') ? '0' : row[72], q4: (row[73] == '') ? '0' : row[73], q5: (row[74] == '') ? '0' : row[74], q6: (row[75] == '') ? '0' : row[75],
                q7: (row[76] == '') ? '0' : row[76], q8: (row[77] == '') ? '0' : row[77],
                q9: (row[78] == '') ? '0' : row[78], q10: (row[79] == '') ? '0' : row[79], q11: (row[80] == '') ? '0' : row[80], q12: (row[81] == '') ? '0' : row[81], q13: (row[82] == '') ? '0' : row[82], q14: (row[83] == '') ? '0' : row[83], q15: (row[84] == '') ? '0' : row[84]
            }
            s3 = `Insert into exp_quiz3 SET?`;
            db.query(s3, post3, (err, result) => {
                if (err)
                    throw err;
            })
            //Test 1
            dt1 = `Delete from exp_test1 where subject_code='${req.session.crs}' and usn='${row[0]}'`;
            db.query(dt1, (err, result) => {
                if (err)
                    throw err;
            })
            tpost1 = {
                usn: row[0], subject_code: req.session.crs,
                q1a: (row[17] == '') ? '0' : row[17], q1b: (row[18] == '') ? '0' : row[18], q1c: (row[19] == '') ? '0' : row[19], q2a: (row[20] == '') ? '0' : row[20], q2b: (row[21] == '') ? '0' : row[21], q2c: (row[22] == '') ? '0' : row[22], q3a: (row[23] == '') ? '0' : row[23], q3b: (row[24] == '') ? '0' : row[24], q3c: (row[25] == '') ? '0' : row[25],
                q4a: (row[26] == '') ? '0' : row[26], q4b: (row[27] == '') ? '0' : row[27], q4c: (row[28] == '') ? '0' : row[28], q5a: (row[29] == '') ? '0' : row[29], q5b: (row[30] == '') ? '0' : row[30], q5c: (row[31] == '') ? '0' : row[31], q6a: (row[32] == '') ? '0' : row[32], q6b: (row[33] == '') ? '0' : row[33], q6c: (row[34] == '') ? '0' : row[34]
            }
            st1 = `Insert into exp_test1 SET ?`;
            db.query(st1, tpost1, (err, result) => {
                if (err)
                    throw err;
            })
            //Test2
            dt2 = `Delete from exp_test2 where subject_code='${req.session.crs}' and usn='${row[0]}'`;
            db.query(dt2, (err, result) => {
                if (err)
                    throw err;
            })
            tpost2 = {
                usn: row[0], subject_code: req.session.crs,
                q1a: (row[51] == '') ? '0' : row[51], q1b: (row[52] == '') ? '0' : row[52], q1c: (row[53] == '') ? '0' : row[53], q2a: (row[54] == '') ? '0' : row[54], q2b: (row[55] == '') ? '0' : row[55], q2c: (row[56] == '') ? '0' : row[56], q3a: (row[57] == '') ? '0' : row[57], q3b: (row[58] == '') ? '0' : row[58], q3c: (row[59] == '') ? '0' : row[59],
                q4a: (row[60] == '') ? '0' : row[60], q4b: (row[61] == '') ? '0' : row[61], q4c: (row[62] == '') ? '0' : row[62], q5a: (row[63] == '') ? '0' : row[63], q5b: (row[64] == '') ? '0' : row[64], q5c: (row[65] == '') ? '0' : row[65], q6a: (row[66] == '') ? '0' : row[66], q6b: (row[67] == '') ? '0' : row[67], q6c: (row[68] == '') ? '0' : row[68]
            }
            st2 = `Insert into exp_test2 SET ?`;
            db.query(st2, tpost2, (err, result) => {
                if (err)
                    throw err;
            })

            //Test 3
            dt3 = `Delete from exp_test3 where subject_code='${req.session.crs}' and usn='${row[0]}'`;
            db.query(dt3, (err, result) => {
                if (err)
                    throw err;
            })
            tpost3 = {
                usn: row[0], subject_code: req.session.crs,
                q1a: (row[85] == '') ? '0' : row[85], q1b: (row[86] == '') ? '0' : row[86], q1c: (row[87] == '') ? '0' : row[87], q2a: (row[88] == '') ? '0' : row[88], q2b: (row[89] == '') ? '0' : row[89], q2c: (row[90] == '') ? '0' : row[90], q3a: (row[91] == '') ? '0' : row[91], q3b: (row[92] == '') ? '0' : row[92], q3c: (row[93] == '') ? '0' : row[93],
                q4a: (row[94] == '') ? '0' : row[94], q4b: (row[95] == '') ? '0' : row[95], q4c: (row[96] == '') ? '0' : row[96], q5a: (row[97] == '') ? '0' : row[97], q5b: (row[98] == '') ? '0' : row[98], q5c: (row[99] == '') ? '0' : row[99], q6a: (row[100] == '') ? '0' : row[100], q6b: (row[101] == '') ? '0' : row[101], q6c: (row[102] == '') ? '0' : row[102]
            }
            st3 = `Insert into exp_test3 SET ?`;
            db.query(st3, tpost3, (err, result) => {
                if (err)
                throw err;
            })
            var qco2 = [0, 0, 0], qco3 = [0, 0, 0], qco4 = [0, 0, 0], qco5 = [0, 0, 0], qco6 = [0, 0, 0],qco1=[0,0,0];
            var qco1m = [0, 0, 0], qco2m = [0, 0, 0], qco3m = [0, 0, 0], qco4m = [0, 0, 0], qco5m = [0, 0, 0], qco6m = [0, 0, 0];
            var tco1 = [0, 0, 0], tco2 = [0, 0, 0], tco3 = [0, 0, 0], tco4 = [0, 0, 0], tco5 = [0, 0, 0], tco6 = [0, 0, 0];
            var tco1m = [0, 0, 0], tco2m = [0, 0, 0], tco3m = [0, 0, 0], tco4m = [0, 0, 0], tco5m = [0, 0, 0], tco6m = [0, 0, 0];
            var co1 = 0, co2 = 0, co3 = 0, co4 = 0, co5 = 0, co6 = 0, t1 = 0, t2 = 0, t3 = 0, q1 = 0, q2 = 0, q3 = 0,labm=0;
            lab=`Select * from exp_lab_co where subject_code='${req.session.crs}' and usn='${row[0]}' `
            db.query(lab,(errlab,resultlab)=>{
                if(errlab)
                throw errlab;
                let datalab=[0,0,0,0,0,0,0,0,0];
                if(resultlab.length>0){
                    let dictlab=JSON.parse(JSON.stringify(resultlab));
                    datalab=Object.values(dictlab[0])
                }
                labm=(datalab[3]+datalab[4]+datalab[5]+datalab[6]+datalab[7]+datalab[8])/12;
            assign=`Select * from exp_assignment_co where subject_code='${req.session.crs}' and usn='${row[0]}' `;
            console.log(assign)
            db.query(assign,(errassign,resultassign)=>{
                if(errassign)
                throw errassign;
                let dictassign=JSON.parse(JSON.stringify(resultassign));
                console.log(resultassign);
            //Quiz 1
            selectq1 = `Select * from exp_quiz1_mapping where subject_code='${req.session.crs}' and version='${(row[1] == '') ? 'A' : row[1]}'`;
            selectq11 = `Select * from exp_quiz1 where subject_code='${req.session.crs}' and usn='${row[0]}' and version='${(row[1] == '') ? 'A' : row[1]}' `;
            db.query(selectq11, (err1, result1) => {
                if (err1)
                    throw err1;
                let dict1 = JSON.parse(JSON.stringify(result1));
                let data1 = Object.values(dict1[0]);
                db.query(selectq1, (err, result) => {
                    if (err)
                        throw err;
                    let dict = JSON.parse(JSON.stringify(result));
                    let data = Object.values(dict[0]);
                    for (var i = 3; i < 18; i++) {
                        if (data[i] == '1')
                            qco1[0] += data1[i + 1];
                        if (data[i] == '2')
                            qco2[0] += data1[i + 1];
                        if (data[i] == '3')
                            qco3[0] += data1[i + 1];
                        if (data[i] == '4')
                            qco4[0] += data1[i + 1];
                        if (data[i] == '5')
                            qco5[0] += data1[i + 1];
                        if (data[i] == '6')
                            qco6[0] += data1[i + 1];

                        q1 += data1[i + 1];
                    }
                    qco1m[0] += data[33];
                    qco2m[0] += data[34];
                    qco3m[0] += data[35];
                    qco4m[0] += data[36];
                    qco5m[0] += data[37];
                    qco6m[0] += data[38];
                })
            })
            //Quiz 2
            selectq2 = `Select * from exp_quiz2_mapping where subject_code='${req.session.crs}' and version='${(row[1] == '') ? 'A' : row[1]}'`;
            selectq21 = `Select * from exp_quiz2 where subject_code='${req.session.crs}' and usn='${row[0]}' and version='${(row[1] == '') ? 'A' : row[1]}' `;
            db.query(selectq21, (err1, result1) => {
                if (err1)
                    throw err1;
                let dict1 = JSON.parse(JSON.stringify(result1));
                let data1 = Object.values(dict1[0]);
                db.query(selectq2, (err, result) => {
                    if (err)
                        throw err;
                    let dict = JSON.parse(JSON.stringify(result));
                    let data = Object.values(dict[0]);
                    for (var i = 3; i < 18; i++) {
                        if (data[i] == '1')
                            qco1[1] += data1[i + 1];
                        if (data[i] == '2')
                            qco2[1] += data1[i + 1];
                        if (data[i] == '3')
                            qco3[1] += data1[i + 1];
                        if (data[i] == '4')
                            qco4[1] += data1[i + 1];
                        if (data[i] == '5')
                            qco5[1] += data1[i + 1];
                        if (data[i] == '6')
                            qco6[1] += data1[i + 1];

                        q2 += data1[i + 1];
                    }
                    qco1m[1] += data[33];
                    qco2m[1] += data[34];
                    qco3m[1] += data[35];
                    qco4m[1] += data[36];
                    qco5m[1] += data[37];
                    qco6m[1] += data[38];
                })
            })

            //Quiz 3

            selectq3 = `Select * from exp_quiz3_mapping where subject_code='${req.session.crs}' and version='${(row[1] == '') ? 'A' : row[1]}'`;
            selectq31 = `Select * from exp_quiz3 where subject_code='${req.session.crs}' and usn='${row[0]}' and version='${(row[1] == '') ? 'A' : row[1]}' `;
            db.query(selectq31, (err1, result1) => {
                if (err1)
                    throw err1;
                let dict1 = JSON.parse(JSON.stringify(result1));
                let data1 = Object.values(dict1[0]);
                db.query(selectq3, (err, result) => {
                    if (err)
                        throw err;
                    let dict = JSON.parse(JSON.stringify(result));
                    let data = Object.values(dict[0]);
                    for (var i = 3; i < 18; i++) {
                        if (data[i] == '1')
                            qco1[2] += data1[i + 1];
                        if (data[i] == '2')
                            qco2[2] += data1[i + 1];
                        if (data[i] == '3')
                            qco3[2] += data1[i + 1];
                        if (data[i] == '4')
                            qco4[2] += data1[i + 1];
                        if (data[i] == '5')
                            qco5[2] += data1[i + 1];
                        if (data[i] == '6')
                            qco6[2] += data1[i + 1];

                        q3 += data1[i + 1];
                    }
                    qco1m[2] += data[33];
                    qco2m[2] += data[34];
                    qco3m[2] += data[35];
                    qco4m[2] += data[36];
                    qco5m[2] += data[37];
                    qco6m[2] += data[38];
                })
            })


            //Test 1
            selectt1 = `Select * from exp_test1_mapping where subject_code='${req.session.crs}' `;
            selectt11 = `Select * from exp_test1 where subject_code='${req.session.crs}' and usn='${row[0]}' `;
            db.query(selectt11, (err1, result1) => {
                if (err1)
                    throw err1;
                let dict1 = JSON.parse(JSON.stringify(result1));
                let data1 = Object.values(dict1[0]);
                db.query(selectt1, (err, result) => {
                    if (err)
                        throw err;
                    let dict = JSON.parse(JSON.stringify(result));
                    let data = Object.values(dict[0]);
                    for (var i = 2; i < 20; i++) {
                        if (data[i] == '1')
                            tco1[0] += data1[i + 1];
                        if (data[i] == '2')
                            tco2[0] += data1[i + 1];
                        if (data[i] == '3')
                            tco3[0] += data1[i + 1];
                        if (data[i] == '4')
                            tco4[0] += data1[i + 1];
                        if (data[i] == '5')
                            tco5[0] += data1[i + 1];
                        if (data[i] == '6')
                            tco6[0] += data1[i + 1];

                        t1 += data1[i + 1];
                    }
                    tco1m[0] += data[38];
                    tco2m[0] += data[39];
                    tco3m[0] += data[40];
                    tco4m[0] += data[41];
                    tco5m[0] += data[42];
                    tco6m[0] += data[43];

                })
            })
            //Test 2
            selectt2 = `Select * from exp_test2_mapping where subject_code='${req.session.crs}' `;
            selectt21 = `Select * from exp_test2 where subject_code='${req.session.crs}' and usn='${row[0]}' `;
            db.query(selectt21, (err1, result1) => {
                if (err1)
                    throw err1;
                let dict1 = JSON.parse(JSON.stringify(result1));
                let data1 = Object.values(dict1[0]);
                db.query(selectt2, (err, result) => {
                    if (err)
                        throw err;
                    let dict = JSON.parse(JSON.stringify(result));
                    let data = Object.values(dict[0]);
                    for (var i = 2; i < 20; i++) {
                        if (data[i] == '1')
                            tco1[1] += data1[i + 1];
                        if (data[i] == '2')
                            tco2[1] += data1[i + 1];
                        if (data[i] == '3')
                            tco3[1] += data1[i + 1];
                        if (data[i] == '4')
                            tco4[1] += data1[i + 1];
                        if (data[i] == '5')
                            tco5[1] += data1[i + 1];
                        if (data[i] == '6')
                            tco6[1] += data1[i + 1];

                        t2 += data1[i + 1];
                    }
                    tco1m[1] += data[38];
                    tco2m[1] += data[39];
                    tco3m[1] += data[40];
                    tco4m[1] += data[41];
                    tco5m[1] += data[42];
                    tco6m[1] += data[43];
                    
                })
            })
            //Test 3
            selectt3 = `Select * from exp_test3_mapping where subject_code='${req.session.crs}' `;
            selectt31 = `Select * from exp_test3 where subject_code='${req.session.crs}' and usn='${row[0]}' `;
            db.query(selectt31, (err1, result1) => {
                if (err1)
                throw err;
                let dict1 = JSON.parse(JSON.stringify(result1));
                let data1 = Object.values(dict1[0]);
                db.query(selectt3, (err, result) => {
                    if (err)
                    throw err;
                    let dict = JSON.parse(JSON.stringify(result));
                    let data = Object.values(dict[0]);
                    for (var i = 2; i < 20; i++) {
                        if (data[i] == '1')
                        tco1[2] += data1[i + 1];
                        if (data[i] == '2')
                            tco2[2] += data1[i + 1];
                        if (data[i] == '3')
                            tco3[2] += data1[i + 1];
                        if (data[i] == '4')
                            tco4[2] += data1[i + 1];
                        if (data[i] == '5')
                            tco5[2] += data1[i + 1];
                        if (data[i] == '6')
                            tco6[2] += data1[i + 1];

                        t3 += data1[i + 1];
                    }
                    tco1m[2] += data[38];
                    tco2m[2] += data[39];
                    tco3m[2] += data[40];
                    tco4m[2] += data[41];
                    tco5m[2] += data[42];
                    tco6m[2] += data[43];

                    if (t1 < t2 && t1 < t3) {
                        co1m = tco1m[1] + tco1m[2];
                        co2m = tco2m[1] + tco2m[2];
                        co3m = tco3m[1] + tco3m[2];
                        co4m = tco4m[1] + tco4m[2];
                        co5m = tco5m[1] + tco5m[2];
                        co6m = tco6m[1] + tco6m[2];
                        co1 = tco1[1] + tco1[2];
                        co2 = tco2[1] + tco2[2];
                        co3 = tco3[1] + tco3[2];
                        co4 = tco4[1] + tco4[2];
                        co5 = tco5[1] + tco5[2];
                        co6 = tco6[1] + tco6[2];
                        t1 = 0;
                    }
                    else if (t2 < t1 && t2 < t3) {
                        co1m = tco1m[0] + tco1m[2];
                        co2m = tco2m[0] + tco2m[2];
                        co3m = tco3m[0] + tco3m[2];
                        co4m = tco4m[0] + tco4m[2];
                        co5m = tco5m[0] + tco5m[2];
                        co6m = tco6m[0] + tco6m[2];
                        co1 = tco1[0] + tco1[2];
                        co2 = tco2[0] + tco2[2];
                        co3 = tco3[0] + tco3[2];
                        co4 = tco4[0] + tco4[2];
                        co5 = tco5[0] + tco5[2];
                        co6 = tco6[0] + tco6[2];
                        t2 = 0;
                    }
                    else {
                        co1m = tco1m[0] + tco1m[1];
                        co2m = tco2m[0] + tco2m[1];
                        co3m = tco3m[0] + tco3m[1];
                        co4m = tco4m[0] + tco4m[1];
                        co5m = tco5m[0] + tco5m[1];
                        co6m = tco6m[0] + tco6m[1];
                        co1 = tco1[0] + tco1[1];
                        co2 = tco2[0] + tco2[1];
                        co3 = tco3[0] + tco3[1];
                        co4 = tco4[0] + tco4[1];
                        co5 = tco5[0] + tco5[1];
                        co6 = tco6[0] + tco6[1];
                        t3 = 0;
                    }


                    if (q1 < q2 && q1 < q3) {
                        co1m = co1m + qco1m[1] + qco1m[2];
                        co2m = co2m + qco2m[1] + qco2m[2];
                        co3m = co3m + qco3m[1] + qco3m[2];
                        co4m = co4m + qco4m[1] + qco4m[2];
                        co5m = co5m + qco5m[1] + qco5m[2];
                        co6m = co6m + qco6m[1] + qco6m[2];
                        co1 = co1 + qco1[1] + qco1[2];
                        co2 = co2 + qco2[1] + qco2[2];
                        co3 = co3 + qco3[1] + qco3[2];
                        co4 = co4 + qco4[1] + qco4[2];
                        co5 = co5 + qco5[1] + qco5[2];
                        co6 = co6 + qco6[1] + qco6[2];
                        q1 = 0;
                    }
                    else if (t2 < t1 && t2 < t3) {
                        co1m = co1m + qco1m[0] + qco1m[2];
                        co2m = co2m + qco2m[0] + qco2m[2];
                        co3m = co3m + qco3m[0] + qco3m[2];
                        co4m = co4m + qco4m[0] + qco4m[2];
                        co5m = co5m + qco5m[0] + qco5m[2];
                        co6m = co6m + qco6m[0] + qco6m[2];
                        co1 = co1 + qco1[0] + qco1[2];
                        co2 = co2 + qco2[0] + qco2[2];
                        co3 = co3 + qco3[0] + qco3[2];
                        co4 = co4 + qco4[0] + qco4[2];
                        co5 = co5 + qco5[0] + qco5[2];
                        co6 = co6 + qco6[0] + qco6[2];
                        q2 = 0;
                    }
                    else {
                        co1m = co1m + qco1m[1] + qco1m[0];
                        co2m = co2m + qco2m[1] + qco2m[0];
                        co3m = co3m + qco3m[1] + qco3m[0];
                        co4m = co4m + qco4m[1] + qco4m[0];
                        co5m = co5m + qco5m[1] + qco5m[0];
                        co6m = co6m + qco6m[1] + qco6m[0];
                        co1 = co1 + qco1[1] + qco1[0];
                        co2 = co2 + qco2[1] + qco2[0];
                        co3 = co3 + qco3[1] + qco3[0];
                        co4 = co4 + qco4[1] + qco4[0];
                        co5 = co5 + qco5[1] + qco5[0];
                        co6 = co6 + qco6[1] + qco6[0];
                        q3 = 0;
                    }

                    console.log(`${t1} ${t2} ${t3} ${q1} ${q2} ${q3}`);



                        
                        final = `Delete from exp_internal_co where subject_code='${req.session.crs}' and usn='${row[0]}' `;
                    db.query(final, (err, result) => {
                        if (err)
                        throw err;
                    })
                    insert = {
                        usn: row[0], subject_code: req.session.crs,
                        co1: co1, co2: co2, co3: co3, co4: co4, co5: co5, co6: co6,
                        co1m: co1m, co2m: co2m, co3m: co3m, co4m: co4m, co5m: co5m, co6m: co6m,
                        co1p: (co1 / co1m) * 100, co2p: (co2 / co2m) * 100, co3p: (co3 / co3m) * 100, co4p: (co4 / co4m) * 100, co5p: (co5 / co5m) * 100, co6p: (co6 / co6m) * 100,
                        t1: t1, t2: t2, t3: t3, q1: q1, q2: q2, q3: q3,cie:Math.round(q1+q2+q3+labm+dictassign[0].asg+((t1+t2+t3)*0.8/2))
                    }
                    qco2 = [0, 0, 0]; qco3 = [0, 0, 0]; qco4 = [0, 0, 0]; qco5 = [0, 0, 0]; qco6 = [0, 0, 0];qco1=[0,0,0];
                    qco1m = [0, 0, 0]; qco2m = [0, 0, 0]; qco3m = [0, 0, 0]; qco4m = [0, 0, 0];qco5m = [0, 0, 0]; qco6m = [0, 0, 0];
                    tco1 = [0, 0, 0]; tco2 = [0, 0, 0]; tco3 = [0, 0, 0]; tco4 = [0, 0, 0]; tco5 = [0, 0, 0]; tco6 = [0, 0, 0];
                    tco1m = [0, 0, 0]; tco2m = [0, 0, 0]; tco3m = [0, 0, 0];tco4m = [0, 0, 0]; tco5m = [0, 0, 0]; tco6m = [0, 0, 0];
                    co1 = 0; co2 = 0; co3 = 0; co4 = 0; co5 = 0; co6 = 0; t1 = 0; t2 = 0; t3 = 0; q1 = 0; q2 = 0; q3 = 0;
                    
                    finalInsert = `Insert into exp_internal_co SET ?`;
                    db.query(finalInsert, insert, (err, result) => {
                        if (err)
                        throw err;
                    })
                    
                })
                })

            })

        })

        }

    })

    res.render('assignupload.ejs');
})

module.exports = router;