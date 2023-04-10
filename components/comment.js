import React, { useState } from 'react'
import { useComment } from '../contexts/CommentContext'
import CommentList from './commentList'
import CommentForm from './commentForm'
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { IconBtn } from '../components/IconBtn'



const Comment = ({...comment }) => {


  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const { getReplies, trigger, setTrigger } = useComment()

  console.log(trigger);

  const childComments = getReplies(comment?._id)

  const handleDelete = async (comment) => { 
    await fetch("/api/addComment", {
      method: "DELETE",
      body: comment._id,
    });    
    setTrigger(!trigger)  
  }

  return (
    <>
      {/* <CommentForm /> */}
      <div className='border rounded-md '>
      {isEditing ? (
          <CommentForm
            isEditing
            autoFocus
            _id={comment._id}
            initialValue={comment.message}
            // onSubmit={onCommentUpdate}
            // loading={updateCommentFn.loading}
            // error={updateCommentFn.error}
          />
        ) : (
          <div key={comment._id} className='p-3 w-96 text-lg '>
            {comment.message}
          </div>
        )}
      
        <div className='flex p-3 justify-around'>
            <IconBtn
                onClick={() => setIsReplying(prev => !prev)}
                isActive={isReplying}
                Icon={FaReply}
                aria-label={isReplying ? "Cancel Reply" : "Reply"}
            />
            <IconBtn
                onClick={() => setIsEditing(prev => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
            />
            <IconBtn
                // disabled={deleteCommentFn.loading}
                onClick={()=>{handleDelete(comment)}}
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
            />
        </div>
      </div>
      {isReplying && <CommentForm parentId={comment._id} isReplying />}

      {childComments?.length > 0 && (
        <div>
          <hr className="w-96 mt-2 mx-auto border"/>
          <button className='ml-20' onClick={()=>setShowReplies(!showReplies)}>
            {!showReplies ? `Show replies` : `Hide Replies`}
          </button>
          {showReplies && 
          <div className="pl-2 py-2">
            <CommentList comments={childComments} />
          </div>
          }
        </div>

      )}  
    </>
  )
}

export default Comment