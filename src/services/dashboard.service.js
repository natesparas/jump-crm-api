const { Sequelize, literal, Op, QueryTypes, where } = require('sequelize')
const db = require('../models/index')
const sequelize = db.sequelize
const transSOHDR = db.transSOHDR
const transSODTL = db.transSODTL
const items = db.items
const category = db.category
const { SO_APPROVE, SO_PRINTING, SO_PRINTED, SO_APP_PRESIDENT } = require('../utils/constants')
const { computeTotal, salesPerSKUFormatResponse } = require('../utils/dashboard')
process.env.TZ = 'Asia/Manila'

const dashboardTotalSales = async (params) => {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1

    let whereCondition = []

    if (params.day == 0) {
        // current date
        whereCondition.push([
            Sequelize.where(Sequelize.fn('DATE', Sequelize.col('so_date')), currDate)
        ])
    } else if (params.day == 1) {
        // month
        whereCondition.push([
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('so_date')), currMonth)
        ])
        whereCondition.push([
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)
        ])
    } else if (params.day == 2) {
        // year
        whereCondition.push([
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)
        ])
    } else if (params.day == 'custom') {
        whereCondition.push({
            so_date: {
                [Op.between]: [params.startDate, params.endDate]
            }
        })
    }

    whereCondition.push({
        status: [SO_APPROVE, SO_PRINTING, SO_PRINTED, SO_APP_PRESIDENT]
    })

    try {
        const result = await transSOHDR.findAll({
            raw: true,
            attributes: [
                'so_no',
                'account_mngr',
                'so_date',
                [Sequelize.fn('COUNT', Sequelize.col('so_no')), 'so_count'],
                [Sequelize.fn('SUM', Sequelize.col('total_amount')), 'n_sum_total']
            ],
            where: {
                [Op.and]: [whereCondition]
            },
            group: 'manager_code',
            order: [['so_count', 'DESC']]
        })

        return await computeTotal(result)

        // return rest;
        // res.status(200).json(rest)
    } catch (error) {
        return error
        // return res.status(500).json(error)
    }
}

const dashboardSalesAccountManager = async (params) => {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1

    let whereCondition = []

    if (params.day == 0) {
        // current date
        whereCondition.push([
            Sequelize.where(Sequelize.fn('DATE', Sequelize.col('so_date')), currDate)
        ])
    } else if (params.day == 1) {
        // month
        whereCondition.push([
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('so_date')), currMonth)
        ])
        whereCondition.push([
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)
        ])
    } else if (params.day == 2) {
        // year
        whereCondition.push([
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)
        ])
    } else if (params.day == 'custom') {
        whereCondition.push({
            so_date: {
                [Op.between]: [params.startDate, params.endDate]
            }
        })
    }

    whereCondition.push({
        status: [SO_APPROVE, SO_PRINTING, SO_PRINTED, SO_APP_PRESIDENT]
    })

    try {
        const result = await transSOHDR.findAll({
            raw: true,
            attributes: [
                'account_mngr',
                [Sequelize.fn('COUNT', Sequelize.col('so_no')), 'so_count'],
                [Sequelize.fn('SUM', Sequelize.col('total_amount')), 'sum_total']
            ],
            where: {
                [Op.and]: [whereCondition]
            },
            group: 'manager_code',
            order: [['so_count', 'DESC']]
        })

        return result
    } catch (error) {
        return error
    }
}

const dashboardSalesPerSKU = async (params) => {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1

    // let whereCondition = '';

    // if (params.day == 0) { // current date
    //     whereCondition = 'AND DATE(trans_so_hdr.so_date) = NOW()'
    // } else if (params.day == 1) { // month
    //     whereCondition = 'AND MONTH(trans_so_hdr.so_date) = ' + currMonth + ' AND YEAR(trans_so_hdr.so_date) = ' + currYear
    // } else if (params.day == 2) { // year
    //     whereCondition = 'AND YEAR(trans_so_hdr.so_date) = ' + currYear
    // } else if (params.day == 'custom') {
    //     whereCondition = "AND DATE(trans_so_hdr.so_date) BETWEEN '" + params.startDate + "' AND '" + params.endDate + "'"
    // }

    let whereCondition = []

    params.startDate = new Date(params.startDate)
    params.endDate = new Date(params.endDate)
    params.endDate.setUTCHours(23, 59, 59, 999)

    if (params.day == 0) {
        // current date
        whereCondition.push([
            Sequelize.where(Sequelize.fn('DATE', Sequelize.col('so_date')), currDate)
        ])
    } else if (params.day == 1) {
        // month
        whereCondition.push([
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('so_date')), currMonth)
        ])
        whereCondition.push([
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)
        ])
    } else if (params.day == 2) {
        // year
        whereCondition.push([
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('so_date')), currYear)
        ])
    } else if (params.day == 'custom') {
        whereCondition.push({
            so_date: {
                [Op.between]: [params.startDate, params.endDate]
            }
        })
    }

    whereCondition.push({
        status: [SO_APPROVE, SO_PRINTING, SO_PRINTED, SO_APP_PRESIDENT]
    })

    try {
        // const result = await sequelize.query(`
        //     SELECT
        //         trans_so_hdr.so_no,
        //         trans_so_hdr.total_amount,
        //         trans_so_hdr.so_date,
        //         mast_item_cat.cat_desc,
        //         COUNT(mast_item_cat.cat_desc) AS item_count,
        //         SUM(trans_so_dtl.total_amount) As sum_total
        //     FROM trans_so_hdr
        //         LEFT JOIN trans_so_dtl ON (trans_so_hdr.so_no = trans_so_dtl.so_no)
        //         LEFT JOIN mast_items ON (trans_so_dtl.item_code = mast_items.id)
        //         LEFT JOIN mast_item_cat ON (mast_items.item_cat = mast_item_cat.id)
        //     WHERE trans_so_hdr.status IN ('${SO_APPROVE}', '${SO_PRINTING}', '${SO_PRINTED}', '${SO_APP_PRESIDENT}')
        //     ${whereCondition}
        //     GROUP BY mast_item_cat.cat_desc;`,
        //     {
        //         type: QueryTypes.SELECT
        //     })
        // const result1 = await transSOHDR.findAll({
        //     attributes: [],
        //     include: [{
        //         model: transSODTL
        //     }],
        //     where: {
        //         [Op.and]: [
        //             whereCondition
        //         ]
        //     }
        // })
        // console.log(result1[0].trans_so_dtls);

        const result = await transSOHDR.findAll({
            // raw: true,
            include: [
                {
                    model: transSODTL,
                    required: false,
                    attributes: [
                        [
                            Sequelize.fn('SUM', Sequelize.col('trans_so_dtls.total_amount')),
                            'sum_total'
                        ]
                    ],
                    include: [
                        {
                            model: items,
                            required: false,
                            attributes: ['item_name'],
                            include: [
                                {
                                    model: category,
                                    attributes: [
                                        [
                                            Sequelize.fn(
                                                'COUNT',
                                                Sequelize.col(
                                                    'trans_so_dtls.mast_item.mast_item_cats.cat_desc'
                                                )
                                            ),
                                            'item_count'
                                        ],
                                        'cat_desc'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            where: {
                [Op.and]: [whereCondition]
            },
            group: ['trans_so_dtls.mast_item.mast_item_cats.cat_desc'],
            attributes: []
        })

        const formattedResponse = await salesPerSKUFormatResponse(result)

        return formattedResponse
    } catch (error) {
        return error
    }
}

module.exports = {
    dashboardTotalSales,
    dashboardSalesAccountManager,
    dashboardSalesPerSKU
}
