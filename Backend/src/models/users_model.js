const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;


const userSchema = new Schema({
  username : {type : String,required : true},
  password : {type : String, required : true},
  status : {type : Number, default : 0 },
},{collection : 'users'});


module.exports = mongoose.model('users',userSchema);
