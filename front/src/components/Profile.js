import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts,setListOfPosts] = useState([]);
    //const [listOfPosts,setListOfPosts] = useState([]);
    //const [likedPosts, setLikedPosts] = useState([])
    let navigate = useNavigate();

    useEffect(()=>{
            axios.get(`http://localhost:3001/basicInfo/${id}`)
            .then((response) => {
                //console.log(response.data[0].username)
                setUsername(response.data[0].username)
            });

            axios.get(`http://localhost:3001/byuserId/${id}`)
            .then((response) => {
                //console.log(response.data[0].username)
                //console.log(response.data[0])
                setListOfPosts(response.data)
                console.log(setListOfPosts)
            });
    }, [])



  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'>
            <h1> Username: {username} </h1>
        </div>
        <div className='listOfPosts'>
            {listOfPosts.map((val, key) => {
            return (
            <div
                className="post"
            >
                <div className="title"> {val.title} </div>
                <div className="body"
                    onClick={() => {
                        navigate(`/singlePost/${val.id}`);
                    }}
                > {val.postText} </div>
                <div className="footer"> {val.username} 
                    
                    
                    <label>
                        {val.dt}
                    </label>
                </div>
            </div>
            );
            })}
        </div>

    </div>
  );
}

export default Profile