const db = require('./db.service')

async function getUsername(username) {
    const results = await db.query(
        `SELECT user_name, password
        FROM user_accounts WHERE user_name = "${username}"`
    )

    return {
        results
    }
}

async function login(page = 1) {
    const rows = await db.query(
        `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
      FROM programming_languages LIMIT ?,?`,
        [offset, config.listPerPage]
    )
    const data = helper.emptyOrRows(rows)
    const meta = { page }

    return {
        data,
        meta
    }
}

module.exports = {
    getUsername,
    login
}
