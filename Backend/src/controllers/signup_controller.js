const { body, validationResult,check } = require('express-validator');
const UsersModel = require('../models/users_model');
const btoa = require('btoa');


const addUser = async (req,res)=>{
  try{
    await check('username').custom(async username => {
                                                      const res = await UsersModel.findOne({username : username}).exec();
                                                      if (res != null){
                                                                        return Promise.reject('Username is already taken');
                                                                      }
                                                      }).run(req);

    await check('username').isLength({ min: 6 }).withMessage('Username must contain at least 5 characters').run(req);
    await check('password').isLength({ min: 6 }).withMessage('Password must contain at least 5 characters').run(req);
    const validationErr = validationResult(req);


    if(validationErr.isEmpty()){

      const user = await new UsersModel({
        username : req.body.username,
        password : btoa(req.body.password)
      }).save();

      res.status(200).json({message : 'New account successfully created'});
    }else{

      throw validationErr.errors;
    }

}catch(err){
  console.log('Error');
  res.json({error : err});
}

}

module.exports = addUser;
