let mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide a name"],
        trim:true,
        maxlength:[20, "name cannot be more than 20 Characters"]
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    versionKey:false,
    timestamps:true,
})

module.exports=mongoose.model('Task',taskSchema)