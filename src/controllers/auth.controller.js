const authService = require('../services/authService')
const db = require('../models/index');
const Users = db.userAccounts;
const {
    hashPassword,
    comparePassword,
    generateRefreshToken,
    generateAccessToken,
    isRefreshTokenExpired
} = require('../utils/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('Test is working!')
}

const loginUser = async (req, res) => {
    try {
        const { user_name, password } = req.body

        if (!user_name || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const user = await Users.findOne({ where: { user_name: user_name } });
        if (!user) {
            return res.status(400).send({ message: "Username not found" });
        }

        // Check if password match
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(400).json({
                message: 'Password is not matched'
            })
        }

        const payload = { id: user.id, email: user.email }

        if (match) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
            })

            const refreshToken = generateRefreshToken(payload)

            // Create secure cookie with refresh token 
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, //accessible only by web server 
                secure: true, //https
                sameSite: 'None', //cross-site cookie 
                maxAge: process.env.COOKIE_REFRESH_EXPIRATION //cookie expiry: set to match rT (1hr)
            })

            const userData = {
                id: user.id,
                user_name: user.user_name,
                first_name: user.first_name,
                last_name: user.last_name,
                status: user.status,
                add_by: user.add_by,
                add_date: user.add_date
            }

            const data = {
                user: userData,
                accessToken: token
            }
            // const newUserData = [user].map((item) => ({ ...item, token: token }))
            return res.json(data)
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const { user_name, password, email, status, add_by } = req.body

        if (!user_name) {
            return res.json({
                error: 'Username is required'
            })
        }

        if (!password) {
            return res.json({
                error: 'Password is required'
            })
        }

        // Check if password is good
        if (!password || password.length < 5) {
            return res.json({
                error: 'Password is required and should be at least 5 characters long'
            })
        }

        // Check email
        const isEmailExist = await Users.findOne({ where: { email: email } })
        if (isEmailExist) {
            return res.json({
                error: 'Email is already taken'
            })
        }

        const isUsernameExist = await Users.findOne({ where: { user_name: user_name } })
        if (isUsernameExist) {
            return res.json({
                error: 'Username is already taken'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await Users.create({
            password: hashedPassword,
            user_name,
            email,
            status,
            add_by
        })

        return res.json(user)
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const logoutUser = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.sendStatus(204) //No content

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Success' })
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.status(403).json({ message: 'Session Expired' }) // Logout user when refresh token is expired

    const refreshToken = cookies.refreshToken

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Session Expired' })

            const user = await Users.findOne({ where: { id: decoded.id } });

            if (!user) return res.status(401).json({ message: 'Unauthorized' })

            const payload = { id: decoded.id, email: decoded.email }
            const accessToken = generateAccessToken(payload)

            res.json({ accessToken })
        }
    )
}

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
}
