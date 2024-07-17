import React, { useState } from 'react'
import axios from 'axios'

function Create({uid}) {
  const [task, setTask] = useState()


  const handleEnter = () => {
    //axios.post('http://localhost:3001/add', {task: task})
    console.log(uid);
    axios.post('http://localhost:3001/add', {
      uid,task
    })
    .then(result => console.log(result))
    .catch(err => console.log(err) )
    //location.reload();
    return alert("Task Created");
  }
  return (
    <div className="create_field">
        <input type="text" placeholder='Enter the task' onChange={(e) => setTask(e.target.value)} />
        <button type="button" onClick={handleEnter}>Create</button>
    </div>
  )
}

export default Create