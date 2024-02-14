// loads .env file conent into process.env by default

require('dotenv').config();

//import express 

const express = require('express')


//import cors

const cors = require('cors')

//import mongoDB

const db = require('./DB/connection')


//import router

const router = require('./Routes/router')

//import appmiddleware 

const appMiddleware = require('./Middlewares/appMiddleware')




//create applicatio (backend ) using express

const pfServer = express()


//use cors

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(appMiddleware)

//use router

pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))



//port create

const PORT = 4000 || process.env.PORT


//server listen

pfServer.listen(PORT,()=>{
    console.log("listening on the port" + PORT);
})


//localhost :4000 -> res pf server is started 

pfServer.get('/',(req,res)=>{
    res.send(`<h1>project fair server started</h1>`)
})

