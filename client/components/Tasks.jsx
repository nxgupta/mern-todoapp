const Tasks = ({ tasks, handleComplete, handleDelete, handleUpdate }) => {
  return (
    <div >
      {
        tasks?.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className='taskContainer'>
          <span className="task mytask">{task.completed?(<strike>{task.name}</strike>):(<span>{task.name}</span>)}</span>
          <button className="task" onClick={() => handleComplete(task._id,task.name)}>done</button>
          <button className="task" onClick={() => handleUpdate(task._id)}>edit</button>
          <button className="task" onClick={() => handleDelete(task._id)}>delete</button>
          </div>))) : (<p>There is no task</p>)
      }
    </div>
  )
}
export default Tasks