const config = require('../configs/config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize, Sequelize);
db.userAccounts = require('./userAccountModel.js')(sequelize, DataTypes);
db.transSOHDR = require('./transSoHdrModel.js')(sequelize, DataTypes);
db.accountManager = require('./accountManagerModel.js')(sequelize, DataTypes);
db.salesManager = require('./salesManagerModel.js')(sequelize, DataTypes);
db.transSODTL = require('./transSoDtlModel.js')(sequelize, DataTypes);
db.items = require('./itemModel.js')(sequelize, DataTypes);
db.category = require('./itemCategoryModel.js')(sequelize, DataTypes);

db.transSOHDR.hasMany(db.transSODTL, { foreignKey: 'so_no' });
db.transSODTL.belongsTo(db.transSOHDR, { foreignKey: 'so_no' });

db.transSODTL.belongsTo(db.items, { foreignKey: 'item_code' });
db.items.hasMany(db.transSODTL, { foreignKey: 'item_code' });

db.items.belongsTo(db.category, { foreignKey: 'item_cat' });
db.category.hasMany(db.items, { foreignKey: 'item_cat' });

// db.transSODTL.hasMany(db.items, {
//     foreignKey: 'item_code'
// });
// db.items.hasMany(db.transSODTL, {
//     foreignKey: 'item_code'
// })

// db.items.hasMany(db.category, {
//     foreignKey: 'id'
// })
// db.category.hasMany(db.items, {
//     foreignKey: 'id'
// })

module.exports = db;