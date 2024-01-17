const { dashboardTotalSales, dashboardSalesAccountManager, dashboardSalesPerSKU } = require('../services/dashboard.service')

const getTotalSales = async (req, res) => {
    try {
        const totalSales = await dashboardTotalSales(req.query)
        res.json(totalSales)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getSalesAccountManager = async (req, res) => {
    try {
        const result = await dashboardSalesAccountManager(req.query)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getSalesPerSKU = async (req, res) => {
    try {
        const result = await dashboardSalesPerSKU(req.query)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getTotalSales,
    getSalesAccountManager,
    getSalesPerSKU
}