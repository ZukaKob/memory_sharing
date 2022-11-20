const { RegisterUser, LoginUser } = require('../controllers/auth_controller')

const router = require('express').Router() 


router.post('/register', RegisterUser) 
router.post('/login', LoginUser)

module.exports = router 