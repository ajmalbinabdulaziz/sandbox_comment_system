import React from 'react'
import { getReplies } from "../pages/index"


const Comment = ({ allComments, comment, replies }) => {

    const getReplies = (commentId) =>
        allComments?.filter((allComment) => allComment.parentId?._ref == commentId)
        .sort(
            (a, b) =>
            new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
      );


    console.log(replies?.length);
    console.log(allComments);
  return (
    <div className='p-3 text-lg border rounded-md w-96'>
        {comment.message}

        {replies?.length > 0 && (
            <div className='p-3'>
                {replies.map((reply) => (
                    <Comment 
                        key={reply._id}
                        comment={reply}
                        replies={getReplies(reply?._id)}
                    />
                ))}
                
            </div>
        )}

    </div>
  )
}

export default Comment


