const appMiddleware =  (req,res,next) =>{
    console.log("inside the eapplication middleware");
    next()
}

module.exports=appMiddleware