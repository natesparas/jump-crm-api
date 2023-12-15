const { Sequelize, literal, Op, QueryTypes, where } = require('sequelize')
const db = require('../models/index')
const transSOHDR = db.transSOHDR
const transSODTL = db.transSODTL
const items = db.items
const category = db.category
const sequelize = db.sequelize
const {
    SO_APPROVE,
    SO_PRINTING,
    SO_PRINTED,
    SO_APP_PRESIDENT
} = require('../utils/constants')
const { computeTotalSales, computeTotalAmount } = require('../utils/formatting')

const getTotalSales = async (req, res) => {
    const { day, startDate, endDate } = req.query

    const currDate = new Date();
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1;

    // date format: YYYY-MM-DD

    let whereCondition = [];

    if (day == 0) { // current date
        whereCondition.push([Sequelize.where(Sequelize.fn('DATE', Sequelize.col('so_date')), currDate)])
    } else if (day == 1) { // month
        whereCondition.push([Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('so_date')), currMonth)])
        whereCondition.push([Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)])
    } else if (day == 2) { // year
        whereCondition.push([Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)])
    } else if (day == 'custom') {
        whereCondition.push({
            'so_date': {
                [Op.between]: [startDate, endDate],
            }
        })
    }

    whereCondition.push({
        status: [SO_APPROVE, SO_PRINTING, SO_PRINTED, SO_APP_PRESIDENT]
    })

    try {
        const result = await transSOHDR.findAll({
            attributes: [
                'so_no',
                'account_mngr',
                'so_date',
                [Sequelize.fn('COUNT', Sequelize.col('so_no')), 'so_count'],
                [Sequelize.fn('SUM', Sequelize.col('total_amount')), 'n_sum_total']
            ],
            where: {
                [Op.and]: [
                    whereCondition
                ]
            },
            group: 'manager_code',
            order: [
                ['so_count', 'DESC'],
            ]
        })

        const totalSales = await computeTotalSales(result)
        const totalAmount = await computeTotalAmount(result)

        const data = {
            totalSales: totalSales,
            totalAmount: totalAmount
        }

        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getSalesAccountManager = async (req, res) => {
    const { day, startDate, endDate } = req.query

    const currDate = new Date();
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1;

    let whereCondition = [];

    if (day == 0) { // current date
        whereCondition.push([Sequelize.where(Sequelize.fn('DATE', Sequelize.col('so_date')), currDate)])
    } else if (day == 1) { // month
        whereCondition.push([Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('so_date')), currMonth)])
        whereCondition.push([Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)])
    } else if (day == 2) { // year
        whereCondition.push([Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)])
    } else if (day == 'custom') {
        whereCondition.push({
            'so_date': {
                [Op.between]: [startDate, endDate],
            }
        })
    }

    whereCondition.push({
        status: [SO_APPROVE, SO_PRINTING, SO_PRINTED, SO_APP_PRESIDENT]
    })

    try {
        const result = await transSOHDR.findAll({
            attributes: [
                'account_mngr',
                [Sequelize.fn('COUNT', Sequelize.col('so_no')), 'so_count'],
                [Sequelize.fn('SUM', Sequelize.col('total_amount')), 'sum_total']
            ],
            where: {
                [Op.and]: [
                    whereCondition
                ]
            },
            group: 'manager_code',
            order: [
                ['so_count', 'DESC'],
            ]
        })

        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getSalesPerSKU = async (req, res) => {
    const { day, startDate, endDate } = req.query

    const currDate = new Date();
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1;

    let whereCondition = '';

    if (day == 0) { // current date
        whereCondition = 'AND DATE(trans_so_hdr.so_date) = NOW()'
    } else if (day == 1) { // month
        whereCondition = 'AND MONTH(trans_so_hdr.so_date) = ' + currMonth + ' AND YEAR(trans_so_hdr.so_date) = ' + currYear
    } else if (day == 2) { // year
        whereCondition = 'AND YEAR(trans_so_hdr.so_date) = ' + currYear
    } else if (day == 'custom') {
        whereCondition = "AND DATE(trans_so_hdr.so_date) BETWEEN '" + startDate + "' AND '" + endDate + "'"
    }

    try {

        const result = await sequelize.query(`
        SELECT 
            trans_so_hdr.so_no, 
            trans_so_hdr.total_amount, 
            trans_so_hdr.so_date, 
            mast_item_cat.cat_desc, 
            COUNT(mast_item_cat.cat_desc) AS item_count,
            SUM(trans_so_dtl.total_amount) As sum_total 
        FROM trans_so_hdr 
            LEFT JOIN trans_so_dtl ON (trans_so_hdr.so_no = trans_so_dtl.so_no) 
            LEFT JOIN mast_items ON (trans_so_dtl.item_code = mast_items.id) 
            LEFT JOIN mast_item_cat ON (mast_items.item_cat = mast_item_cat.id) 
        WHERE trans_so_hdr.status IN ('${SO_APPROVE}', '${SO_PRINTING}', '${SO_PRINTED}', '${SO_APP_PRESIDENT}')
        ${whereCondition}
        GROUP BY mast_item_cat.cat_desc;`,
            {
                type: QueryTypes.SELECT
            })

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports = {
    getTotalSales,
    getSalesAccountManager,
    getSalesPerSKU
}