module.exports = (sequelize, DataTypes) => {
    const itemCategory = sequelize.define('mast_item_cat', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        cat_code: {
            type: DataTypes.STRING,
        },
        cat_desc: {
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
        },
        color: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    })

    return itemCategory;
}