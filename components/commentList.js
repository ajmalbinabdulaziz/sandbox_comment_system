import React from 'react'
import Comment from './comment'


const CommentList = ({ comments }) => {


  return (
    comments.map(comment => (
        <div key={comment._id}>
            <Comment {...comment} />
        </div>
    ))
   
  )
}

export default CommentList