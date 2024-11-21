const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongodb');

const userSchema = mongoose.Schema ({
   email : String,
   passsword : String,
   username : String
})

const user = mongoose.model('user',userSchema);

module.exports = user;
