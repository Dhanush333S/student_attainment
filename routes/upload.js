const express=require('express');
const session=require('express-session');
const upload=require('express-fileupload');
const csv=require('csv-parser');
const fs=require('fs');
const router=express.Router();
router.use(express.urlencoded({extended:false}));
var db=require('./connection');

// const result=[];

router.use(upload());
router.get('/',(req,res)=>{
    res.render('upload.ejs');
})
router.post('/',(req,res)=>{
    var row=[];
    if(req.files){   
        var file=req.files.img;
        var filename=file.name;
        console.log(filename);

        file.mv('./uploads/'+filename,function(err){
             if (err){
                 throw err
             }
            var data=fs.readFileSync('./uploads/'+filename,'utf-8');
            data = data.split("\r\n");
            for (var i=3;i<data.length;i++){
                row=data[i].split(',');
                if(row[9]==''||row[9]==' ')
                console.log(row);
            }
            //This is for reading a csv in table format:

            // fs.createReadStream('./uploads/'+filename)
            // .pipe(csv({}))
            // .on('data',(data)=>result.push(data))
            // .on('end',()=>{
            //     console.log(result);
            // });
            res.send("File Uploaded");
         })
        
    }
})

module.exports=router;