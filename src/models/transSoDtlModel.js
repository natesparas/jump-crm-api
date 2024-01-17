const itemModel = require("./itemModel");
const transSoHdrModel = require("./transSoHdrModel");

module.exports = (sequelize, DataTypes) => {
    const trans_so_dtl = sequelize.define('trans_so_dtl', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        so_no: {
            type: DataTypes.STRING,
            // allowNull: false,
            references: {
                model: transSoHdrModel,
                key: 'so_no' // The primary key 'id' in the trans_so_hdr
            }
        },
        part_no: {
            type: DataTypes.STRING,
        },
        item_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: itemModel,
                key: 'id'
            }
        },
        item_name: {
            type: DataTypes.STRING,
        },
        item_desc: {
            type: DataTypes.STRING,
        },
        qty: {
            type: DataTypes.INTEGER,
        },
        selling_price: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.00
        },
        supplier_cost: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.00
        },
        total_amount: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.00
        },
        gp_amount: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.00
        },
        gp_rate: {
            type: DataTypes.STRING,
        },
        include: {
            type: DataTypes.STRING,
        },
        start_date: {
            type: DataTypes.STRING,
        },
        end_date: {
            type: DataTypes.STRING,
        },
        contract_no: {
            type: DataTypes.STRING,
        },
        serial_no: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true
    });

    return trans_so_dtl;
}