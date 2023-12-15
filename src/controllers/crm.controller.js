const { Sequelize, literal, Op, QueryTypes, where } = require('sequelize')
const db = require('../models/index')
const sequelize = db.sequelize
const {
    PROP_REVIEW,
    PROP_APPROVE,
    PROP_PRINTING,
    PROP_PRINTED,
    PROP_LOST,
    PROP_WIN,
    PROP_WITH_SO
} = require('../utils/constants')
const { getStages, getProducts, getProductPerType } = require('../utils/crm')

const perStage = async (req, res) => {
    const { day } = req.query

    const currDate = new Date();
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1;

    let whereCondition = '';

    if (day == 0) { // current date
        whereCondition = 'AND DATE(trans_proposal_hdr.prop_date) = NOW()'
    } else if (day == 1) { // month
        whereCondition = 'AND MONTH(trans_proposal_hdr.prop_date) = ' + currMonth + ' AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 2) { // year
        whereCondition = 'AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 3) { // quarter
        whereCondition = 'AND QUARTER(trans_proposal_hdr.prop_date) = QUARTER(CURDATE()) AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 4) {
        // whereCondition = "AND DATE(trans_proposal_hdr.prop_date) BETWEEN '" + startDate + "' AND '" + endDate + "'"
    }

    try {
        const result = await sequelize.query(`
            SELECT 
                trans_proposal_hdr.win_date,
                trans_proposal_hdr.lost_date,
                trans_proposal_hdr.stage_code,
                IF(currency = 'usd',
                    trans_proposal_hdr.total_php,
                    trans_proposal_hdr.total_amount) AS total_amount
            FROM trans_proposal_hdr
            LEFT JOIN trans_proposal_dtl ON (trans_proposal_hdr.prop_no = trans_proposal_dtl.prop_no)
            WHERE
                trans_proposal_hdr.status IN ('${PROP_REVIEW}', '${PROP_APPROVE}', '${PROP_PRINTING}', '${PROP_PRINTED}', '${PROP_LOST}', '${PROP_WIN}', '${PROP_WITH_SO}')
                AND trans_proposal_hdr.prop_mngr IS NOT NULL
                ${whereCondition}
            GROUP BY trans_proposal_hdr.prop_no
        `)

        const data = {
            stages: getStages(result)
        }

        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const proposalByProduct = async (req, res) => {
    const { day } = req.query

    const currDate = new Date();
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1;

    let whereCondition = '';

    if (day == 0) { // current date
        whereCondition = 'AND DATE(trans_proposal_hdr.prop_date) = NOW()'
    } else if (day == 1) { // month
        whereCondition = 'AND MONTH(trans_proposal_hdr.prop_date) = ' + currMonth + ' AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 2) { // year
        whereCondition = 'AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 3) { // quarter
        whereCondition = 'AND QUARTER(trans_proposal_hdr.prop_date) = QUARTER(CURDATE()) AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 4) {
        // whereCondition = "AND DATE(trans_proposal_hdr.prop_date) BETWEEN '" + startDate + "' AND '" + endDate + "'"
    }

    try {
        const result = await sequelize.query(`
            SELECT 
                mast_item_cat.cat_desc,
                mast_item_cat.color
            FROM trans_proposal_hdr
            LEFT JOIN trans_proposal_dtl ON (trans_proposal_hdr.prop_no = trans_proposal_dtl.prop_no)
            LEFT JOIN mast_items ON (trans_proposal_dtl.item_code = mast_items.id) AND (trans_proposal_dtl.part_no = mast_items.part_no)
            LEFT JOIN mast_item_cat ON (mast_items.item_cat = mast_item_cat.id)
            WHERE
                trans_proposal_hdr.status IN ('${PROP_REVIEW}', '${PROP_APPROVE}', '${PROP_PRINTING}', '${PROP_PRINTED}', '${PROP_LOST}', '${PROP_WIN}', '${PROP_WITH_SO}')
                AND trans_proposal_hdr.prop_mngr IS NOT NULL
                ${whereCondition}
            GROUP BY trans_proposal_hdr.prop_no
        `)

        const data = getProducts(result)

        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const proposalPerProductType = async (req, res) => {
    const { day } = req.query

    const currDate = new Date();
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1;

    let whereCondition = '';

    if (day == 0) { // current date
        whereCondition = 'AND DATE(trans_proposal_hdr.prop_date) = NOW()'
    } else if (day == 1) { // month
        whereCondition = 'AND MONTH(trans_proposal_hdr.prop_date) = ' + currMonth + ' AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 2) { // year
        whereCondition = 'AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 3) { // quarter
        whereCondition = 'AND QUARTER(trans_proposal_hdr.prop_date) = QUARTER(CURDATE()) AND YEAR(trans_proposal_hdr.prop_date) = ' + currYear
    } else if (day == 4) {
        // whereCondition = "AND DATE(trans_proposal_hdr.prop_date) BETWEEN '" + startDate + "' AND '" + endDate + "'"
    }

    try {
        const result = await sequelize.query(`
            SELECT 
                mast_item_cat.cat_desc,
                mast_item_cat.color,
                trans_proposal_hdr.win_date,
                trans_proposal_hdr.lost_date,
                trans_proposal_hdr.stage_code,
                IF(currency = 'usd',
                    trans_proposal_hdr.total_php,
                    trans_proposal_hdr.total_amount) AS total_amount
            FROM trans_proposal_hdr
            LEFT JOIN trans_proposal_dtl ON (trans_proposal_hdr.prop_no = trans_proposal_dtl.prop_no)
            LEFT JOIN mast_items ON (trans_proposal_dtl.item_code = mast_items.id) AND (trans_proposal_dtl.part_no = mast_items.part_no)
            LEFT JOIN mast_item_cat ON (mast_items.item_cat = mast_item_cat.id)
            WHERE
                trans_proposal_hdr.status IN ('${PROP_REVIEW}', '${PROP_APPROVE}', '${PROP_PRINTING}', '${PROP_PRINTED}', '${PROP_LOST}', '${PROP_WIN}', '${PROP_WITH_SO}')
                AND trans_proposal_hdr.prop_mngr IS NOT NULL
                ${whereCondition}
            GROUP BY trans_proposal_hdr.prop_no
            ORDER BY mast_item_cat.cat_desc ASC
        `)

        const data = getProductPerType(result)

        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    perStage,
    proposalByProduct,
    proposalPerProductType
}