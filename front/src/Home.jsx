import React, { useState } from 'react'
import Create from './Create'

function Home() {
    const [todos, setTodos] = useState([])
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
                <div>
                    {todo}
                </div>
            ))
        }
    </div>
  )
}

export default Home