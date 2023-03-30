const InputBox = ({handleCreate, task, handleChange, editTask}) => {
    return (
        <div >
            <input className="task" value={task} onChange={(e)=>handleChange(e)} name="name"/>
            <button className="btn" onClick={()=>handleCreate(task)}>{editTask?"Update":"Add"}</button>
        </div>
    )
}
export default InputBox