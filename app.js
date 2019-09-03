const express = require('express');
const app = express();
const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const bodyParser = require('body-parser');

const Post = require("./model/post");

mongoose
    .connect("mongodb://mahen:12345a@ds127783.mlab.com:27783/upload_image", {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'));

    app.set('view engine','ejs');
    app.use(bodyParser.json());


    app.get("/",(req,res)=>{
        Post.find({},(err,doc)=>{
            if (err) throw (err);
           
           var base64 = (doc[0].photo.data.toString('base64')); 
            doc.imagepath = base64;
        res.render("index",{posts:doc});
        })
      
    })

    app.post("/upload",(req, res, next)=>{
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                });
            }
            let post = new Post(fields);
    
         
    
            if (files.photo) {
                post.photo.data = fs.readFileSync(files.photo.path);
                console.log(files.photo.type);
                post.photo.contentType = files.photo.type;
            }
            post.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }
           
              res.redirect("/");
            });
        });
    })
 
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`A Node Js API is listening on port: ${port}`);
    });    