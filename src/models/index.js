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

// LEFT JOIN trans_so_dtl ON (trans_so_hdr.so_no = trans_so_dtl.so_no) 
db.transSOHDR.hasMany(db.transSODTL, { foreignKey: 'so_no' });
db.transSODTL.belongsTo(db.transSOHDR, { foreignKey: 'so_no' });

// LEFT JOIN mast_items ON (trans_so_dtl.item_code = mast_items.id) 
db.transSODTL.belongsTo(db.items, { foreignKey: 'item_code' });
db.items.hasMany(db.transSODTL, { sourceKey: 'id', foreignKey: 'item_code' });


// LEFT JOIN mast_item_cat ON (mast_items.item_cat = mast_item_cat.id) 
// db.category.hasMany(db.items, { foreignKey: 'item_cat' });
// db.items.belongsTo(db.category, { foreignKey: 'item_cat' });
db.items.hasMany(db.category, { sourceKey: 'item_cat', foreignKey: 'id' });
db.category.belongsTo(db.items, { sourceKey: 'id', foreignKey: 'id' });


// db.items.hasMany(db.category, { foreignKey: 'item_cat' });
// db.category.belongsTo(db.items, { foreignKey: 'item_cat' });

// db.transSODTL.belongsToMany(db.items, {
//     through: 'trans_so_dtl_mast_items', // This is the name of the intermediate table
//     foreignKey: 'dtl_id',
// });

// db.items.belongsToMany(db.transSODTL, {
//     through: 'trans_so_dtl_mast_items', // This is the name of the intermediate table
//     foreignKey: 'item_id',
// });

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

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

module.exports = db;