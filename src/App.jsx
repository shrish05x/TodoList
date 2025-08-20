import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './component/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodo = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodo)
    saveToLs()
  }

  const handleDelete = (e, id) => {
    let newTodo = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodo)
    saveToLs()

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs()
  }
  const toggelfinished = (e) => {
    setFinished(!finished)
  }



  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 w-1/2 bg-violet-100  min-h-[80vh]" >
        <h1 className='font-bold text-xl my-4'>iTask - Manage Your Task</h1>
        <div className="addTodo ">
          <h2 className='text-md font-bold  p-2'>Add a Todo</h2>
          <div className='flex flex-row '>
            <input onChange={handleChange} value={todo} type="text" placeholder='add tasks' className=' w-full bg-white rounded-full p-2' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 font-bold disabled:bg-violet-950 hover:bg-violet-950 hover:tta text-md  text-white mx-6 p-4 py-1 rounded-full'>Save  </button>
          </div>
        </div>
        <div className='p-4'>
          

        <div className='flex gap-6 my-2 '>
          <input type="checkbox" onChange={toggelfinished} checked={finished} />
          <p>show finished</p>
        </div>
        <h1 className='text-md font-bold'> Your Todos </h1>
        <div className="todos  ">
          {todos.length === 0 && <div className='m-5'>No Todos to display </div>}
          {todos.map(item => {
            return (finished || !item.isCompleted) && <div key={item.id} className='todo flex w-full my-3 justify-between'>
              <div className='flex gap-5'>
                <input type="checkbox" onClick={handleCheckbox} name={item.id} checked={item.isCompleted}  />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full  ">
                <button onClick={(e) => handleEdit(e, item.id)} className="Edit bg-violet-800 font-bold hover:bg-violet-950 text-sm text-white mx-1 p-2 py-1 rounded-md "> <MdModeEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="Delete bg-violet-800 font-bold hover:bg-violet-950 text-sm mx-1 text-white p-2 py-1 rounded-md"><MdDeleteForever /></button>
              </div>
            </div>

})}

        </div>
</div>
      </div>

    </>
  )
}

export default App
