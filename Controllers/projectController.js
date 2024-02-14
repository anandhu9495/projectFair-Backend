//import project schema

const projects = require('../Models/projectSchema')

exports.addUserProject = async(req,res) =>{

    console.log("Inside addUserProject");

    //get userId

    const userId = req.payload

    //get projectImage
    const projectImage = req.file.filename

    //get project details

    const {title,language,github,link,overview} = req.body

    console.log(userId,title,language,github,link,overview,projectImage);


    //logic for adding project details

    // res.status(200).json("add user project request received")

    try{

        //if github is present in mongoDb

        const existingProject= await projects.findOne({github})
        if(existingProject){
            res.status(402).json("project already exist")
        }
        else{

            //if github is not present in mongoDB new project should be created and save them in mongoDB

            const newProject = new projects({
                title,language,github,link,overview,projectImage,userId
            })
            await newProject.save() // save new project to mongoDB
            res.status(200).json(newProject)//response send to client


        }

    }
    catch(err){

        res.status(404).json({message:err.message})

    }



}


//get all user-projects

exports.getAllUsersProject = async (req,res) => {

    const userId = req.payload

    try{

        const userProject = await projects.find({userId})
        res.status(200).json(userProject)


    }
    catch(err){
        res.status(401).json("internal server error" + err.message)


    }


}

//get all project

exports.getAllProjects = async (req,res) => {


    const searchKey = req.query.search

    const query = {
        language:{
                  $regex : searchKey,
                  $options:"i",
        
        }
    }





    try{

        const allProjects =  await projects.find(query)
        res.status(200).json(allProjects)


    }
    catch(err){

        res.status(401).json("internal server error"+ err.message)

    }
}

//get home project

exports.getHomeProjects = async (req,res) => {
    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)


    }
    catch(err){

        res.status(401).json("internal server error"+ err.message)

    }
}


//update project

exports.updateProject = async (req,res) => {

    const {title,language,github,link,overview,projectImage}=req.body

    const uploadImgae = req.file ? req.file.filename:projectImage

    userId = req.payload

    const {pid} = req.params

    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,link,overview,projectImage:uploadImgae,userId})
        await updateProject.save()
        res.status(200).json(updateProject)

    }
    catch(err){
        res.status(401).json("internal server Error"+err.message)
    }
}


exports.deleteProject = async (req,res) => {

    const {pid} = req.params

    try{
        const deleteUserProject = await projects.findOneAndDelete({_id:pid})
        res.status(200).json(deleteUserProject)

    }
    catch(err){
        res.status(401).json("internal error"+ err.message)

    }



}


