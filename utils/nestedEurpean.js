import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useContext, createContext, useEffect, useMemo } from "react";
import ThemeContext from "../components/context";
import CommentList from '../components/commentList'
import { fetchAllComments } from '../utils/services'
import { sanityClient } from '../sanity';
import { useQuery } from "react-query";


const Home = ({ allComments }) => {


  const parentComments = allComments.filter(
    (parentComment) => parentComment.parentId == null
  )

  const getReplies = (commentId) =>
    allComments
      .filter((allComment) => allComment.parentId?._ref == commentId)
      .sort(
        (a, b) =>
          new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
      );

  
  // console.log(commentsByParentId)
  // console.log(rootComments)
  // console.log(allComments)

  return (
    <div className="flex ">
      <h1>HUHUH</h1>
      <h1>{allComments[0]?.parentId?._ref}</h1>
  
    </div>
  )
}

export default Home



export const getServerSideProps = async () => {

  // const allComments = fetchAllComments()
  // const allComments = await sanityClient.fetch(`*[_type == "comment"]`);

  const allComments = await sanityClient.fetch(`*[_type=='comment']`)

  return {
    props: { allComments, },
  };
};