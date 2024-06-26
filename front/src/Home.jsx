import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';


function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

  return (
    <div className="home">
        <h2>Wormhole</h2>
        <Create />
        {
            todos.length === 0 
            ?
            <div><h2>Empty</h2></div>
            :
            todos.map(todo => (
                <div className="todo-tasks"> 
                    <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                    <i class="bi bi-circle"></i>
                        {todo.task}
                    </div>
                    <i class="bi bi-trash"></i>
                </div>
            ))
        }
    </div>
  )
}

export default Home