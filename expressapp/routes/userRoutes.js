const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', userController.registerPOST);
router.post('/login', userController.loginPOST);
router.get('/logout', userController.logout);

module.exports = router;

