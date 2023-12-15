const { generateAccessToken } = require('../utils/auth')
const jwt = require('jsonwebtoken')

const refreshToken = async (req, res) => {
    const expiredAccessToken = req.header('Authorization')
    const refreshToken = req.body.refreshToken

    if (!expiredAccessToken || !refreshToken) {
        return res.status(400).json({ message: 'Access token and refresh token are required.' })
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Refresh token is invalid or expired.' })
        }

        // Generate a new access token
        const payload = { id: decoded.id, email: decoded.email }
        const newAccessToken = generateAccessToken(payload)

        res.json({ accessToken: newAccessToken })
    })
}
