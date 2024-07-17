import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocation } from 'react-router-dom';


function Task() {
    const location=useLocation()
    const [todos, setTodos] = useState([])
    const [data, setData] = useState([])
    const [comments, setComments] = useState([])

    /*
    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])
    */

    useEffect(() => {
        axios.get('http://localhost:3001/get/'+(location.state.uid))
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
        .then(result => console.log(result))
        .catch(err => console.log(err))
        //location.reload();
        //return alert("Task Completed");
  
    }

/*
    const setTask = (id) => {
        axios.put('http://localhost:3001/edit/'+id, {
            task
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
        //location.reload();
        //return alert("Task Completed");

    }
    */

    const handleRet = (id) => {
        axios.get('http://localhost:3001/retreive/'+id)
        .then(result => console.log(result))
        .catch(err => console.log(err))
        //location.reload();
        return alert("Task Retrieve");
  
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => console.log(result))
        .catch(err => console.log(err))
        //location.reload();
        return alert("Deleted Successfully");
    }

    const handleComment = (id) => {
        //const element = document.getElementById("tf").style.display = "inline";
        /*
        if (document.getElementById("tf").style.display === "inline"){
            document.getElementById("tf").style.display = "none"
        }
        else{
            document.getElementById("tf").style.display = "inline"
        }
        */
        if (document.getElementById(id).style.display === "inline"){
            document.getElementById(id).style.display = "none"
        }
        else{
            document.getElementById(id).style.display = "inline"
        }

        
        //location.reload();
        //return alert("Open Comment");
    }

    async function setTask(task, id){
        alert(task)
        try{
            await axios.put('http://localhost:3001/edit/'+id, {
                task
            })
            .then(result => console.log(result))
            .catch(err => console.log(err))
            //location.reload();
            //return alert("Task Completed");
        }catch(e){
            console.log(e);
        }

    }

    async function setComment(comment, id){
        alert(comment)
        try{
            await axios.put('http://localhost:3001/comment/'+id, {
                comment
            })
            .then(result => console.log(result))
            .catch(err => console.log(err))
            //location.reload();
            //return alert("Task Completed");
        }catch(e){
            console.log(e);
        }

    }

    async function deleteComment(id, index){
        try{
            await axios.put('http://localhost:3001/deleteComment/'+id, {
                index
            })
            .then(result => console.log(result))
            .catch(err => console.log(err))
            //location.reload();
            //return alert("Task Completed");
        }catch(e){
            console.log(e);
        }

    }


  return (
    <div className="home">
        <div className='taskpage'>
            <h1>Hello {location.state.id} and {location.state.uid} welcome</h1>
        </div>
        <h2>Task Management</h2>
        <Create uid={location.state.uid}/>
        {
            todos.length === 0 
            ?
            <div><h2>No current tasks</h2></div>
            :
            todos.map(todo => (
                <div className="todo-tasks"> 
                    <div className='checkbox'>
                        <i class="bi bi-square" onClick={() => handleEdit(todo._id)} ></i>
                        {todo.done ? 
                            <i class="bi bi-circle-fill"></i>
                        : <i class="bi bi-circle"></i>
                        }
                        {todo.task}
                        <input name="a_task" type="text" id="a_task" defaultValue={todo.task} 
                               onChange={(e) => setTask(e.target.value,todo._id)}/>
                    </div>
                    <div className='sh-comment'>
                        <i class="bi bi-chat" onClick={()=>handleComment(todo._id)}></i>
                        <input id={todo._id} style={{display:"none"}} type="text" placeholder="comment..." onChange={(e) => setComment(e.target.value, todo._id)} />
                        <p>{todo.created}</p>
                    </div>
                    {/* <i class="bi bi-pen" onClick={() => editTask(todo._id)} ></i> */}
                    <i class="bi bi-trash" onClick={() => handleDelete(todo._id)}></i>
                    {/* <i class="bi bi-trash" onClick={() => handleRet(todo._id)}></i> */}
                    {todo.comments.map((c, index) => (
                        <div className="commentBox">
                            <p>{c}</p>
                            <i class="bi bi-trash" onClick={(e) => deleteComment(todo._id,c)}></i>
                        </div>
                        
                    ))}

                </div>

                
            ))
        }
    </div>
  )
}

export default Task