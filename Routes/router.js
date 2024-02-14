const express = require('express');

const userController= require('../Controllers/userController')

const projectController = require("../Controllers/projectController")

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

//create router object of express to define path

const router = new express.Router()


//using router object to define path


//Register API path

router.post('/register',userController.register)

//Login API path

router.post('/login',userController.login)


//add user project API path 

router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//get all users

router.get('/project/all-user-project',jwtMiddleware,projectController.getAllUsersProject)

//get all projects

router.get('/project/all-project',jwtMiddleware,projectController.getAllProjects)

//get home project

router.get('/project/home-project',projectController.getHomeProjects)

//update project

router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateProject)

//delect

router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)




module.exports=router