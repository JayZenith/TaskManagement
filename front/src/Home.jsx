import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'

function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])
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
                    {todo.task}
                </div>
            ))
        }
    </div>
  )
}

export default Home