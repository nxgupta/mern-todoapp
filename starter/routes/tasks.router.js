let express=require('express');
let router=express.Router();
let {
    getAllTasks,createTask,getTask,updateTask,deleteTask
}=require('../controllers/tasks.controllers')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router;