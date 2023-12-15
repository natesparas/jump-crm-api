const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
    test,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
} = require('../controllers/auth.controller')

router.use(
    cors({
        credentials: true,
        origin: process.env.BASE_URL
    })
)

// router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/refreshToken', refreshToken)

module.exports = router
