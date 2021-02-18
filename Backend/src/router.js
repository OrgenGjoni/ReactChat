const express = require('express');
const db = require('./db');
const logInController = require('./controllers/login_controller');
const signUpController = require('./controllers/signup_controller');
const {getConversationsList,getConversationsMessages} = require('./controllers/conversations_controller');
router = express.Router();


router.post('/login',logInController);
router.post('/signup',signUpController);
router.get('/conversations/:token',getConversationsList);
router.get('/messages/:token/:conv_id',getConversationsMessages)


module.exports = router;
