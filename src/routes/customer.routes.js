const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
    getCustomer,
    createCustomer,
    updateCustomerById,
    deleteCustomer
} = require('../controllers/customerController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/customer', getCustomer)
router.post('/customer', createCustomer)
router.put('/customer', updateCustomerById)
router.delete('/customer/:id', deleteCustomer)

module.exports = router
