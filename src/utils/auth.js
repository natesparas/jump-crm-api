const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }

                resolve(hash)
            })
        })
    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

const isTokenExpired = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const currentTimestamp = Math.floor(Date.now() / 1000) // Convert current time to Unix timestamp (in seconds)

        // Compare the "exp" claim with the current timestamp + expiration duration
        return decoded.exp < currentTimestamp
    } catch (error) {
        // If there's an error (e.g., token is invalid or expired), consider it expired
        return true
    }
}

const isRefreshTokenExpired = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const currentTimestamp = Math.floor(Date.now() / 1000) // Convert current time to Unix timestamp (in seconds)

        // Compare the "exp" claim with the current timestamp + expiration duration
        return decoded.exp < currentTimestamp
    } catch (error) {
        // If there's an error (e.g., token is invalid or expired), consider it expired
        return true
    }
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
    })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
    })
}

module.exports = {
    hashPassword,
    comparePassword,
    isTokenExpired,
    isRefreshTokenExpired,
    generateAccessToken,
    generateRefreshToken
}
