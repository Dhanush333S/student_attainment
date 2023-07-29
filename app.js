const express= require ('express');
app=express();
const session =require('express-session');
const {v4:uuidv4}=require('uuid');
var db=require('./routes/connection');

const login=require('./routes/server');
const staffcheck=require('./routes/staffidcheck');
const index=require('./routes/index')
const assignment=require('./routes/assignment');
const selectsem=require('./routes/selectsem');
const asgnstudent=require('./routes/asgnstudent');
const asgneach=require('./routes/asgneach');
const assignUpload=require('./routes/assignUpload');
const ciemap=require('./routes/ciemap');
const quizmap=require('./routes/quizmap');
const cieinput=require('./routes/cieinput');
const stddetails=require('./routes/stddetails');
const crsendsrvy=require('./routes/crsendsrvy');
const lab=require('./routes/lab');
const courseoutcome=require('./routes/courseoutcome');
const cieseecourseoutcome=require('./routes/cieseecourseoutcome');
const seegrades=require('./routes/seegrades');
const directin=require('./routes/directindirect');
const internalmarks=require('./routes/internalmarks');
const viewcie=require('./routes/viewcie');
const viewquiz=require('./routes/viewquiz');
const viewassign=require('./routes/viewassign');
const subdetails=require('./routes/subdetails');
const level=require('./routes/level');
const po=require('./routes/po');
const podisplay=require('./routes/podisplay');
const grade=require('./routes/grade');

const logout=require('./routes/logout');
const { use } = require('./routes/viewcie');

app.use(express.static('images'));
app.use(express.static('formats'));
app.set('view-engine','ejs');
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/',login);
app.use('/first',staffcheck);
app.use('/index',index)
app.use('/assignment',assignment);
app.use('/selectsem',selectsem);
app.use('/asgnstudent',asgnstudent);
app.use('/asgneach',asgneach);
app.use('/assignUpload',assignUpload);
app.use('/ciemap',ciemap);
app.use('/quizmap',quizmap);
app.use('/cieinput',cieinput);
app.use('/stddetails',stddetails);
app.use('/crsendsrvy',crsendsrvy);
app.use('/lab',lab);
app.use('/courseoutcome',courseoutcome);
app.use('/cieseecourseoutcome',cieseecourseoutcome);
app.use('/seegrades',seegrades);
app.use('/directindirect',directin);
app.use('/internalmarks',internalmarks);
app.use('/viewcie',viewcie);
app.use('/viewquiz',viewquiz);
app.use('/viewassign',viewassign);
app.use('/subdetails',subdetails);
app.use('/level',level);
app.use('/pocalculation',po);
app.use('/podisplay',podisplay);
app.use('/grade',grade);


app.use('/logout',logout);
app.listen(3000,()=>{
    console.log('Server running in http://localhost:3000');
});