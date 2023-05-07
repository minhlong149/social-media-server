const jwt = require("jsonwebtoken");

export default class MiddlewareController {
    static verifyToken(request, response, next) {
        try{
            const token = request.header('Authorization').replace('Bearer ', '')
            jwt.verify(token, process.env.JWT_ACCESS_KEY,(error, decoded)=> {
                if(error) {
                    response.status(403).json("Token is invalid");
                }
                else {
                    //request.user = decoded.user;
                    request.userId = decoded.userId;
                    next();
                }
            })
        } catch(error) {
            response.status(401).json("You are not allowed to access this");
        }        
    }
}