const jwt = require("jsonwebtoken")


const verifyUser = (req , res , next)=> {
    let token = req.header.authorization
    if(!token)
        return res.status(401).json({error: ' auth token not present'})
}