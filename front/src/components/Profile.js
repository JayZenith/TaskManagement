import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts,setListOfPosts] = useState([]);
    //const [listOfPosts,setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([])
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    useEffect(()=>{
          if (!localStorage.getItem("accessToken")){
            navigate("/");
          } else {
            axios.get(`http://localhost:3001/basicInfo/${id}`)
            .then((response) => {
                //console.log(response.data[0].username)
                setUsername(response.data[0].username)
            });

            axios.get(`http://localhost:3001/byuserId/${id}`)
            .then((response) => {
                //console.log(response.data[0].username)
                //console.log(response.data[0])
                setListOfPosts(//response.data.listOfPosts
                    
                    response.data.listOfPosts.filter((post)=>{
                        if (post.userID != parseInt(id)){
                            console.log(post)
                            //return post
                        }
                        else{
                            return post;
                        }
                    })
                    
                );
                //console.log(listOfPosts)
                //console.log(response.data.listOfPosts)
                //console.log(response.data.userLikes)
                setLikedPosts(
                    response.data.userLikes.map((like) => {
                      return like.id;
                    })
                  );
                  console.log(likedPosts)
            });
          }
            
    }, [])


    const likePost = (postId) => {
        axios.post("http://localhost:3001/likes", {
            postID: postId
        }, {
            headers: {accessToken: localStorage.getItem("accessToken")}
        }).then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
                if(post.id === postId){
                    //alert(response.data.liked)
                    if(response.data.liked)
                        return{...post, dt:post.dt+1}
                    else
                        return{...post, dt:post.dt-1}
                } else {
                    return post;
                }
            }))
            if(likedPosts.includes(postId)){
              setLikedPosts(
                likedPosts.filter((id) => {
                  return id != postId;
                })
              );
            } else {
              setLikedPosts([...likedPosts,postId])
            }
        })

    }


  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'>
            <h1> Username: {username} </h1>
            {authState.username === username && (
                <button onClick={() => {navigate(`/Settings/${id}`)}}> Change Password </button>
            )}
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
                        
                        <i class="bi bi-hand-thumbs-up"
                            onClick={() => {
                                likePost(val.id);
                            }}
                            className={likedPosts.includes(val.id) ? "bi bi-hand-thumbs-up" : "bi bi-hand-thumbs-up red" 
                                
                            }
                        ></i>
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