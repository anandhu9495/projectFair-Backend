//router - level - middle ware

const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwt midleware  - router-level-middleware ");

    //get the token form user request

    const token = req.headers['authorization']?.slice(7)
    console.log(token);


    try{

        //token verifivation

        const tokenVerification = jwt.verify(token,'superkey2024')
        console.log(tokenVerification);

        req.payload = tokenVerification.userId


        next()

    }
    catch(err){
        res.status(401).json("Authorization failed..... pls login again")

    }
}

module.exports = jwtMiddleware