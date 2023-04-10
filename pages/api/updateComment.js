// import { useSession, signIn, signOut } from "next-auth/react"
import { createClient } from "next-sanity"


export const sanityClient = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-08-11",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
  });

export default async function updateComment(req, res) {
    console.log(req.body)
  switch (req.method){
    case "PUT":
        const { _id, message } = JSON.parse(req.body)

        try {
            await sanityClient.patch( _id ).set({ message }).commit();
        } catch (error) {
            return res.status(500).json({ message: "Couldn't not update comment", error })
        }
        console.log("Comment Updated")
        return res.status(200).json({ message: "Comment Updated" })

  }   
}
