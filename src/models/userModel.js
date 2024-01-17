module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user_accounts', {
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        add_by: {
            type: Sequelize.STRING,
            allowNull: false
        },
        add_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    })

    return User
}
