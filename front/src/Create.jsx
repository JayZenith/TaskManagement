import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask] = useState()
  const handleEnter = () => {
    axios.post('http://localhost:3001/add', {task: task})
    .then(result => console.log(result))
    .catch(err => console.log(err) )
    return alert("Task Created");
  }
  return (
    <div className="create_field">
        <input type="text" placeholder='Enter' onChange={(e) => setTask(e.target.value)} />
        <button type="button" onClick={handleEnter}>Enter</button>
    </div>
  )
}

export default Create