const express = require('express')
const router = express.Router()

const {
    getTotalSales,
    getSalesAccountManager,
    getSalesPerSKU
} = require('../controllers/dashboard.controller')

router.get('/getTotalSales', getTotalSales)
router.get('/getSalesAccountManager', getSalesAccountManager)
router.get('/getSalesPerSKU', getSalesPerSKU)

module.exports = router
