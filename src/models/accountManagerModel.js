module.exports = (sequelize, DataTypes) => {
    const accountManager = sequelize.define('mast_acct_mngr', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        acct_mngr_id: {
            type: DataTypes.INTEGER
        },
        last_name: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        middle_name: {
            type: DataTypes.STRING
        },
        full_name: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        tel_no: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        date_hired: {
            type: DataTypes.DATE
        },
        sales_mngr: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        signature: {
            type: DataTypes.STRING
        },
        add_by: {
            type: DataTypes.STRING
        },
        add_date: {
            type: DataTypes.DATE
        },
        last_edit_by: {
            type: DataTypes.STRING
        },
        last_edit_date: {
            type: DataTypes.DATE
        },
        has_account: {
            type: DataTypes.STRING
        },
        am_code: {
            type: DataTypes.STRING
        },
        team: {
            type: DataTypes.STRING
        },
        monthly_target: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.00
        },
        type: {
            type: DataTypes.STRING
        }
    })

    return accountManager
}