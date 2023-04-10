import React, { useState, useContext, createContext, useEffect, useMemo } from "react";
import { fetchPostDetails, fetchSlug } from "../../utils/services";
import CommentForm from "../../components/commentForm";
import CommentList from '../../components/commentList'
import { useComment } from "../../contexts/CommentContext";
import { sanityClient } from '../../sanity';


export const getStaticPaths = async () => {

    const posts = await fetchSlug()
  
    const paths = posts?.map((postt) => ({
      params: {
        slug: postt?.slug?.current,
      },
    }));
  
    return {
      paths,
      fallback: "blocking",
    };
  };
  
  
  export const getStaticProps = async ({ params }) => {
  
    const post = await fetchPostDetails(params?.slug)
  
    if (!post) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: { post },
      revalidate: 60,
    };
  };


const PostPage = ({ post }) => {

  const { getReplies, rootComments } = useComment()
  console.log(rootComments);
  return (
    <div className="flex ">
      <h1>HUHUH</h1>
      {rootComments && rootComments.length > 0 && (
        <div className='p-4 mt-20'>
          <div className="pb-6">
            <CommentForm />
          </div>

          <CommentList 
            comments={rootComments} 
          />  
        </div>
      )}

    </div>
  )
}

export default PostPage



// export const getServerSideProps = async () => {


//   const allComments = await sanityClient.fetch(`*[_type=='comment']`)

//   return {
//     props: { allComments, },
//   };
// };