import { useForm } from "react-hook-form";
import { useState } from "react"
import { useComment } from "../contexts/CommentContext";



const CommentForm = ({ _id, parentId, autoFocus=false, isReplying, isEditing, initialValue="" }) => {

    const [ submitted, setSubmitted ] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [ buttonClicked, setButtonClicked ] = useState(false)
    const [userComment, setUserComment] = useState(initialValue);
    const { trigger, setTrigger } = useComment()

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
          
        await fetch("/api/addComment", {
          method: "POST",
          body: JSON.stringify({
            message: userComment,
            parentId,          
          }),
        });          
        setUserComment("");
        setTrigger(!trigger)
      }

      const handleCommentUpdate = async (e) => {
        e.preventDefault();
          
        await fetch("/api/updateComment", {
          method: "PUT",
          body: JSON.stringify({ 
            _id,          
            message: userComment,
          }),
        });          
        setUserComment("");
        setTrigger(!trigger)
      }

    const handleChangeComment = (e) => {
        e.preventDefault();
        setUserComment(e.target.value);
    };

    return (
        <form className='flex flex-col space-y-2'>
            <input 
                autoFocus={autoFocus}
                className="w-72 h-12 border p-4 border-blue-100"
                type="text"
                value={userComment}
                placeholder="Comment here.."
                onChange={handleChangeComment}
            />
            {/* <textarea 
                {...register('message')}
                className='h-24 rounded-lg border border-gray-200 p-2 pl-4 outline-none
                disabled:bg-gray-100'
            /> */}

            {isEditing ? 
                (
                    <button
                    className="focus:outline-none focus:ring focus:border-blue-800
                    px-6 py-2 m-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
                    font-semibold"
                    onClick={handleCommentUpdate}
                    >
                        Update
                    </button>      
                ) :
                (
                <button
                    className="focus:outline-none focus:ring focus:border-blue-800
                    px-6 py-2 m-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
                    font-semibold"
                    onClick={handleCommentSubmit}
                    >
                    {isReplying ? "reply" : "submit"} 
                </button>  
                )
                
            }
            {/* <button
                className="focus:outline-none focus:ring focus:border-blue-800
                px-6 py-2 m-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
                font-semibold"
                onClick={handleCommentSubmit}
                >
                {isReplying ? "reply" : isEditing ? "Update"  : "submit"} 
            </button>                 */}
        </form>
    )
}


export default CommentForm