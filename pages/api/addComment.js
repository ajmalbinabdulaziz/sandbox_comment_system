// import { useSession, signIn, signOut } from "next-auth/react"
import { createClient } from "next-sanity"


export const sanityClient = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-08-11",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
  });

export default async function addComment(req, res) {
    console.log(req.body)
  switch (req.method){
    case "POST":
        const { _id, parentId, message } = JSON.parse(req.body)  //very imp, otherwise may run into internal server errors

        try {
            await sanityClient.create({
                _type: "comment",
                _id,
                message,
                user: "Rivoga",
                userId: "1",
                parentId: {_ref: parentId, _type: "reference"}
            })
        } catch (error) {
            return res.status(500).json({ message: "Couldn't not submit comment", error })
        }
        console.log("Comment Submitted")
        return res.status(200).json({ message: "Comment submitted" })

        break;
    case "DELETE":

        try {
            await sanityClient
            .delete(req.body)
        } catch (error) {
            return res.status(500).json({ message: "Couldn't not delete comment", error })
        }
        console.log("Comment Deleted")
        return res.status(200).json({ message: "Comment Deleted" })

        break;
    case "PUT":

        try {
            await sanityClient.patch( _id ).set({ message }).commit();
        } catch (error) {
            return res.status(500).json({ message: "Couldn't not update comment", error })
        }
        console.log("Comment Updated")
        return res.status(200).json({ message: "Comment Updated" })

  }   
}
