const computeTotalSales = async (data) => {
    let totalSales = 0
    data.map((amount) => totalSales += parseInt(amount.dataValues.so_count))
    return totalSales
}

const computeTotalAmount = async (data) => {
    let total = 0
    data.map((amount) => total += parseFloat(amount.dataValues.n_sum_total))
    return total
}

module.exports = {
    computeTotalSales,
    computeTotalAmount
}