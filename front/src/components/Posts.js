import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';

function Posts() {

    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setListOfPosts(res.data);
        })
    }, []);
  return (
    <div>
        {listOfPosts.map((val,key) => {
            return(
                <div className='post-f'>
                    <div className='title-f'> {val.title} </div>
                    <div className='body-f'> {val.postText} </div>
                    <div className='footer-f'> {val.username} </div>
                </div>
            );;
        })}
    </div>
  )
}

export default Posts