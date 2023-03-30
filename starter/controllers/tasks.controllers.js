const asyncWrapper = require('../middlewares/tryCatch.middleware');
let Task=require('../models/tasks.models')
const getAllTasks= asyncWrapper(async (req,res)=>{
    let tasks=await Task.find({});    //if the query inside the find is empty, it will fetch every document
    res.status(200).json({tasks})
})

const createTask=asyncWrapper(async (req,res)=>{
    const task=await Task.create(req.body) //create the task and return it back
    res.status(201).json(task) 
})

const getTask=asyncWrapper(async (req,res)=>{
    let {id:taskId}=req.params
    let task=await Task.findOne({_id:taskId})
    if(!task) return res.status(404).json({msg:`no task with id: ${taskId}`})
    res.status(200).json({task})
})

const deleteTask= asyncWrapper(async (req,res)=>{
        let {id:taskId}=req.params
        let deletedTask=await Task.findOneAndDelete({_id:taskId})
    if(!deletedTask) return res.status(404).json({msg:`no task with id: ${taskId}`})
    res.status(200).send();
})

const updateTask= asyncWrapper(async (req,res)=>{
        let {id:taskId}=req.params
        let payload=req.body;
        let task=await Task.findOneAndUpdate({_id:taskId},payload,{
            new:true, runValidators:true
        })
        if(!task) return res.status(404).json({msg:`no task with id: ${taskId}`})
        res.status(200).send()
})

module.exports={
    getAllTasks,createTask,getTask,updateTask,deleteTask
}