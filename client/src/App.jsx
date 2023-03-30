import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Tasks from '../components/Tasks'
import './App.css'
import InputBox from '../components/InputBox'
function App() {
  const [tasks, setTasks] = useState([])
  const [editTaskId, setEditTaskId] = useState(null)
  const [task, setTask] = useState('');
  const handleChange = (e) => {
    setTask(e.target.value)
  }
  const handleCreate = async (task) => {
    if (editTaskId) {
      await axios.patch(`http://localhost:5000/api/v1/tasks/${editTaskId}`, { "name": task })
      let tasks = await axios.get('http://localhost:5000/api/v1/tasks')
      setTasks(tasks.data.tasks)
      setEditTaskId('')
      setTask('')
      return;
    }
    if (task) {
      let response = await axios.post('http://localhost:5000/api/v1/tasks', { "name": task })
      setTasks([...tasks, response.data])
      setTask('')
    }
  }
  const handleUpdate = async (id) => {
    let response = await axios.get(`http://localhost:5000/api/v1/tasks/${id}`)
    setTask(response.data.task.name)
    setEditTaskId(id);
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`)
    let tasks = await axios.get('http://localhost:5000/api/v1/tasks')
    setTasks(tasks.data.tasks)
  }
  const handleComplete = async (id,task) => {
    await axios.patch(`http://localhost:5000/api/v1/tasks/${id}`, { "name": task, "completed":true })
    let tasks = await axios.get('http://localhost:5000/api/v1/tasks')
    setTasks(tasks.data.tasks)
  }
  useEffect(() => {
    const getTasks = async () => {
      let tasks = await axios.get('http://localhost:5000/api/v1/tasks')
      setTasks(tasks.data.tasks)
    }
    getTasks()
  }, [])

  return (
    <div className='container'>
      <Header />
      <InputBox handleCreate={handleCreate} task={task} handleChange={handleChange} />
      <Tasks tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} handleComplete={handleComplete} />
    </div>
  )
}
export default App