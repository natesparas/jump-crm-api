const jwt = require('jsonwebtoken')
const db = require('../models/index');
const Users = db.userAccounts;

const protect = async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (authHeader && authHeader?.startsWith('Bearer ')) {
        try {
            // extract token from header string
            token = authHeader.split(' ')[1]

            // verified token returns user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // find user
            req.user = await Users.findByPk(decoded.id)

            next()
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized1' })
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Unauthorized2' })
    }
}

module.exports = { protect }