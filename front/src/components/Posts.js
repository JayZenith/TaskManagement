import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../Posts.css";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from "../helpers/AuthContext";

function Posts() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([])
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    
    useEffect(() => {
      if (!localStorage.getItem("accessToken")){
        navigate("/");
      }else{
        axios.get("http://localhost:3001/posts", {
            headers: {accessToken: localStorage.getItem("accessToken")}
        }).then((res) => {
        //setListOfPosts(res.data);
        setListOfPosts(res.data.listOfPosts);
        //alert(res.data.listOfPosts);
        setLikedPosts(
          res.data.userLikes.map((like) => {
            return like.id;
          })
        );
        //console.log([...likedPosts, 5])
        //console.log("yo")
        //console.log(res.data.userLikes);
        });
      }
    }, []);

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
    <div className="App">
      <Link to="/createpost"><h1 id="createPost">Create A Post</h1></Link>
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
            <div className="footer"> 
              <div className="username">
                <Link to={`/profile/${val.userID}`}>{val.username} </Link>
              </div>
                
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
  );
}

export default Posts;
