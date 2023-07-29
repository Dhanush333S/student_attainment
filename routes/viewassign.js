const { render } = require('ejs');
const express=require('express');
const router=express.Router();
const session=require('express-session');
router.use(express.urlencoded({extended:false}))
var db=require('./connection');

router.get('/',(req,res)=>{
    console.log('Hello')
    select=`Select * from exp_assignment_mapping where subject_code='${req.session.crs}' `;
    db.query(select,(err,result)=>{
        if(err){
            res.render('error.ejs',{err:err});
            return;
        }
        if(result.length<1){
            res.render('error.ejs',{err:'Fill in the Assignment Mapping !!'});
            return;
        }
        let dict=JSON.parse(JSON.stringify(result));
        let data=Object.values(dict[0]);
        res.render('viewassign.ejs',{data:data,back:'/index'});
    })
})

module.exports=router;