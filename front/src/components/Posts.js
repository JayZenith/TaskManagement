import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../Posts.css";
import { Link, useNavigate } from "react-router-dom";

function Posts() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((res) => {
        setListOfPosts(res.data);
        });
    }, []);

    const likePost = (postId) => {
        axios.post("http://localhost:3001/likes", {
            postID: postId
        }, {
            headers: {accessToken: localStorage.getItem("accessToken")}
        }).then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
                if(post.id === postId){
                    alert(response.data.liked)
                    if(response.data.liked)
                        return{...post, dt:post.dt+1}
                    else
                        return{...post, dt:post.dt-1}
                } else {
                    return post;
                }
            }))
        })
    }
  

  return (
    <div className="App">
      <Link to="/createpost">Create A Post</Link>
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
                <button onClick={() => {
                    likePost(val.id);
                }}
                >Like</button>
                <label>
                    {val.dt}
                </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
