import { useContext,createContext, useState, useEffect, useMemo, useCallback } from "react";
import { sanityClient } from '../sanity';



const Context = createContext()

export function useComment(){
  return useContext(Context);
}

export default function AppStore({ children }){

  const [comments, setComments] = useState()
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    sanityClient.fetch(`*[_type=='comment']`).then(data => setComments(data))

  }, [trigger])

    const commentsByParentId = useMemo(() => {
    const group = {}
    comments?.forEach(comment => {
      group[comment.parentId?._ref] ||= []
      group[comment.parentId?._ref].push(comment)
    })
    return group
  }, [comments])


  const getReplies = (parentId) => {
    return commentsByParentId[parentId]
  }


  return(
    <Context.Provider value={{
        getReplies,
        rootComments: commentsByParentId[undefined],
        trigger, setTrigger,
      }}
    >
      {children}
    </Context.Provider>
  )

}

