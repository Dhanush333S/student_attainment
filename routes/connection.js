const express=require('express');
const router=express.Router();
const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'student_marks'
});
db.connect((err)=>{
   if(err)
   throw err;
   console.log("Successfully connected to Database")
})

module.exports=db;