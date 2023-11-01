import jwt from 'jsonwebtoken'

export const createToken = (user) => {
    const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY)

    return token
}