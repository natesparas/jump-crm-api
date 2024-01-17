module.exports = (sequelize, DataTypes) => {
    const userAccounts = sequelize.define('user_accounts', {
        // id: {
        //     type: DataTypes.STRING,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        user_type: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
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
        email: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        tel_no: {
            type: DataTypes.STRING
        },
        position: {
            type: DataTypes.STRING
        },
        signature: {
            type: DataTypes.STRING
        },
        account_head: {
            type: DataTypes.STRING
        },
        user_name: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        add_by: {
            type: DataTypes.STRING
        },
        add_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })

    return userAccounts
}
