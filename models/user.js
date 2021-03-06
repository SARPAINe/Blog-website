const mongoose = require('mongoose');



const UserSchema=module.exports=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  admin:{
    type:Number
  }
});


const User=module.exports=mongoose.model('User',UserSchema);

