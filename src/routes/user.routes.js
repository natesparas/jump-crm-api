const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
    getUserAccounts,
    createCustomer,
    updateCustomerById,
    deleteCustomer,
    getUserProfile
} = require('../controllers/user.controller')
const { protect } = require('../middlewares/authMiddleware')
const { jwtValidation } = require('../middlewares/jwtValidation')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/user-accounts', getUserAccounts)
router.get('/profile', getUserProfile)
// router.post('/customer', createCustomer)
// router.put('/customer', updateCustomerById)
// router.delete('/customer/:id', deleteCustomer)

module.exports = router
