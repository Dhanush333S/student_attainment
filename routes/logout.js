const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log('ERROR!!!');
            res.send("ERROR RETRY");
        } 
        else{
            res.render('login.ejs',{logout:"Successfully Logged Out!"})
        }
    })
});

module.exports=router;