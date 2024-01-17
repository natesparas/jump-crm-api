const jwt = require('jsonwebtoken')
const { isTokenExpired, generateAccessToken } = require('../utils/auth')
const db = require('../models/index')
const Users = db.userAccounts

const jwtValidation = async (req, res, next) => {
    // const token = req.header('Authorization')

    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }

    // const isExpired = await isTokenExpired(token)
    // // refresh token if expired
    // if (isExpired) {
    //     return res.status(401).json({ message: 'Token Expired' })
    // }

    // try {
    //     // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     // req.user = decoded // You can now access user information in your routes.
    //     // next()

    //     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //         if (err) {
    //             return res.status(401).json({ message: 'Unauthorized' });
    //         }

    //         // Token is valid, and `decoded` contains user information
    //         req.user = decoded;
    //         next();
    //     });
    // } catch (error) {
    //     return res.status(401).json({ message: 'Invalid token' })
    // }

    let token
    const authHeader = req.headers.authorization || req.headers.Authorization

    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.status(403).json({ message: 'Session Expired' }) // Logout user when refresh token is expired

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    if (authHeader && authHeader?.startsWith('Bearer ')) {
        try {
            // extract token from header string
            token = authHeader.split(' ')[1]

            // verified token returns user id
            // jwt.verify(
            //     token,
            //     process.env.JWT_SECRET,
            //     (err, decoded) => {
            //         if (err) {
            //             console.log(err);
            //             // return res.status(403).json({ message: 'Forbidden' })
            //             const payload = { id: decoded.id, email: decoded.email }
            //             const newAccessToken = generateAccessToken(payload)
            //             req.token = newAccessToken
            //         }

            //         // find user
            //         req.user = Users.findByPk(decoded.id)
            //         next()
            //     }
            // )
            const isExpired = isTokenExpired(token)

            if (isExpired) {
                return res.status(401).json({ message: 'Token Expired' })
                // request new access token using refreshToken
                const decoded = jwt.verify(cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET)
                req.user = await Users.findByPk(decoded.id)

                const payload = { id: req.user.id, email: req.user.email }
                req.token = generateAccessToken(payload)
            }

            next()
        } catch (error) {
            // console.log(error);
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}

module.exports = { jwtValidation }
