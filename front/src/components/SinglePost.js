import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../helpers/AuthContext";

function SinglePost() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/singlePost/byId/${id}`)
      .then((response) => {
        setPostObject(response.data[0]);
      });
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [comments]); //did this fix problem of having to rerender upon create/delete comment??
//thought is rerender any change to comments and abovce gets send back comment details
  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          postID: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          //alert(res.data.username)
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
            //id: res.data.id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment(""); //to make the newComment value empty within input
        }
      });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/deleteComment/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(()=> {
      setComments(comments.filter((val)=>{
        return val.id != id; //I think i rerender upon each
      }))
    });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
        <div className="rightSide">
          <div className="addCommentContainer">
            <input
              type="text"
              placeholder="Comment.."
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            <button onClick={addComment}>Add Comment</button>
          </div>
          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
                <div key={key} className="comment">
                  {comment.commentBody}
                  <label> Username: {comment.username} </label>
                  {authState.username === comment.username && (
                    <button
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
