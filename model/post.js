const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
   name:{
    type:String
   },
    photo: {
        data: Buffer,
        contentType: String
    }
   
});

module.exports = mongoose.model('Post', postSchema);