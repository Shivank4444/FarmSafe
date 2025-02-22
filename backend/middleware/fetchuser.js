const jwt = require("jsonwebtoken");
const JWT_SECRET = "Jatinisagoodbo$y";


const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    try {
        
        if(!token){
            res.status(401).send({error:"Access Denied"})
        }
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        
        next();
        
    } catch (error) {
        res.status(401).send({error:"Access Denied"})
    }
}


module.exports = fetchuser;