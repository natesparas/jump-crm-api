const express = require('express')
const router = express.Router()

const {
    perStage,
    proposalByProduct,
    proposalPerProductType
} = require('../controllers/crm.controller')

router.get('/stages', perStage)
router.get('/proposalByProduct', proposalByProduct)
router.get('/proposalPerProductType', proposalPerProductType)

module.exports = router
