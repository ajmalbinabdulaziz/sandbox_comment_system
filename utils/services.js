import { sanityClient } from "../sanity";


export const fetchTodos = async () => {
  
      const result = await sanityClient.fetch(
        `*[_type=="todo"] | order(_createdAt desc){
            _id, text
           }`,
      )
                
      return result
  };

export const fetchPosts = async () => {

  const result = await sanityClient.fetch(
    `*[_type=="post"] | order(_createdAt desc){
      _id,
      title,
      slug,
     }`,
  )
            
  return result
};

export const fetchPostDetails = async (slug) => {

  const query = `*[_type=="post" && slug.current==$slug][0]{
    _id,
    _createdAt,
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id],
    'childComments': *[
      _type == "comment" &&
      post._ref == ^._id && parent != null]  
  }`

  const postDetails = await sanityClient.fetch(query, { slug })
   
  return postDetails
};

export const fetchSlug = async () => {

  const query = `*[_type=="post"]{
    slug {
        current
    }
  }`

  const postSlug = await sanityClient.fetch(query)
   
  return postSlug
};


export const fetchAllComments = async () => {

  const allComments = await sanityClient.fetch(`*[_type == "comment"]`);
   
  return allComments
};

