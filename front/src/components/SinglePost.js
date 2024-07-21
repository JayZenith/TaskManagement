import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../App.css";

function SinglePost() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/singlePost/byId/${id}`).then((response) => {
           setPostObject(response.data[0]);

        });
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data)
         });
    }, []);

  return (
    <div className="postPage">
        <div className='leftSide'>
            <div className='post' id="individual">
                <div className='title'>{postObject.title}</div>
                <div className='body'>{postObject.postText}</div>
                <div className='footer'>{postObject.username}</div>
            </div>
            <div className='rightSide'>
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comment.."/>
                    <button>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return <div key={key} className='comment'>{comment.commentBody}</div>
                    })}
                </div>
            </div>
        </div> 
    </div>
  )
}

export default SinglePost