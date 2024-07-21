import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import '../Posts.css';
import { Link, useNavigate } from 'react-router-dom';

function Posts() {

    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setListOfPosts(res.data);
        });
    }, []);

  return (
    <div className="App">
        <Link to="/createpost">Create A Post</Link>
        {listOfPosts.map((val,key) => {
            return(
                <div className='post' onClick={() => {navigate(`/singlePost/${val.id}`)}}>
                    <div className='title'> {val.title} </div>
                    <div className='body'> {val.postText} </div>
                    <div className='footer'> {val.username} </div>
                </div>
            );;
        })}
    </div>
  )
}

export default Posts