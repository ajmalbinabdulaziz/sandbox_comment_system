import Link from "next/link";
import { sanityClient } from '../sanity';



const Home = ({ posts }) => {

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3
    md:gap-6 p-3 md:px-1 max-w-6xl mx-auto'>
      {posts?.map((post) => (
        <Link key={post?._id} href={`/posts/${post?.slug?.current}`}>
            <div className='border p-1 mb-4 group cursor-pointer overflow-hidden'>
              <div className="h-16">
                <p className="text-lg text-center pt-1 font-bold">{post?.title}</p>
              </div>

            </div>
        </Link>
      ))}
    </div>
  )
}

export default Home



export const getServerSideProps = async () => {


  const posts = await sanityClient.fetch(`*[_type=="post"]{
    _id,
    title,
    slug {
      current
    },
  }`)

  return {
    props: { posts, },
  };
};