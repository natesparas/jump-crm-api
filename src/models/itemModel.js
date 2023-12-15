const itemCategoryModel = require("./itemCategoryModel");

module.exports = (sequelize, DataTypes) => {
    const salesManager = sequelize.define('mast_items', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_cat: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: itemCategoryModel,
                key: 'id' // The primary key 'id' in the itemCategoryModel
            }
        },
        brand_id: {
            type: DataTypes.STRING,
        },
        item_code: {
            type: DataTypes.STRING,
        },
        item_name: {
            type: DataTypes.STRING,
        },
        item_desc: {
            type: DataTypes.STRING,
        },
        part_no: {
            type: DataTypes.STRING,
        },
        gross_price: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.00
        },
        status: {
            type: DataTypes.STRING,
        },
        add_by: {
            type: DataTypes.STRING,
        },
        add_date: {
            type: DataTypes.DATE,
        },
        last_edit_by: {
            type: DataTypes.STRING,
        },
        last_edit_date: {
            type: DataTypes.DATE,
        }
    }, {
        freezeTableName: true
    })

    return salesManager;
}