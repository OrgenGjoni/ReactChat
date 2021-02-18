const jwt = require('jsonwebtoken');
require('dotenv').config();
const btoa = require('btoa');
const privateKey = process.env.PRIVATE_KEY

const UsersModel = require('../models/users_model');


const logInController = async (req,res)=>{
  try{

      const result = await UsersModel.findOne({username : req.body.username, password : btoa(req.body.password)}).exec();
      if(result != null){

        const token = jwt.sign({
          data : { _id : result._id,
                   name : result.username
                  }
        },privateKey,{ expiresIn: '1h' });

  
        const response = {
          token : token
        }

        res.send(response);

      }else{

        response = {
          message : 'Wrong username or password'
        }

        res.send(response);
      }
  }catch(err){
    console.log(err)
  }
}


module.exports = logInController;
