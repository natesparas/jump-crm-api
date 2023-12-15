const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        user: "root",
        password: "",
        database: "jump_crm",
        connectTimeout: 60000,
        dialect: "mysql"
    },
    listPerPage: 10,
};
module.exports = config;