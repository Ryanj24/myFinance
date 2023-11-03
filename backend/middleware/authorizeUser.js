import jwt from 'jsonwebtoken'

export const authorizeUser = (req, res, next) => {

    // Get the JWT from the request headers
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]

    // If no JWT is passed in the headers, alert the user to the fact no token is present
    if (!token) {
        return res.json({error: true, message: "No token present"})
    }

    // Verify the JWT
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.json({error: true, message: "User not authorized"})
        }

        req.user = user
        next();
    })
}