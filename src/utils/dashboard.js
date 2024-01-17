const computeTotal = async (data) => {
    let totalSales = 0,
        totalAmount = 0
    data.map((amount) => {
        ;(totalSales += parseInt(amount.so_count)), (totalAmount += parseFloat(amount.n_sum_total))
    })
    return {
        totalSales: totalSales,
        totalAmount: totalAmount
    }
}

const salesPerSKUFormatResponse = async (data) => {
    if (data.length > 0) {
        let dtl = data.map((item) => item.dataValues.trans_so_dtls)

        dtl = dtl.flat()

        const items = dtl.map((item) => {
            const temp = item.dataValues
            return {
                total: temp.sum_total,
                count: temp.mast_item.mast_item_cats[0].dataValues.item_count,
                title: temp.mast_item.mast_item_cats[0].dataValues.cat_desc
            }
        })

        return items
    } else {
        return {}
    }
}

module.exports = {
    computeTotal,
    salesPerSKUFormatResponse
}
