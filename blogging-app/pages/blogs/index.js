import BlogList from "@/components/blogs/BlogList";
import { dbUrl } from "../api/new-blog";
import { MongoClient } from "mongodb";
import { useSession } from "next-auth/react";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";

function Blogs({blogs}) {

const { data: session } = useSession()
const authCtx = useContext(AuthContext)

if(!session) {
    return <Fragment>
        <p>You are not authorized to access this page.</p>
        <Link href='/login'>Login?</Link>
        </Fragment>
}

    console.log(session)
    const token = session.token.token.jti
    authCtx.authenticate(token)


return <BlogList blogs={blogs}/>

}

export default Blogs;

export async function getServerSideProps(context) {

    const client = await MongoClient.connect(dbUrl)
    const db = client.db()
    const blogsCollection = db.collection('blogs')
    const blogs = await blogsCollection.find().toArray();
    client.close()

    return {
        props: {
            blogs :
                blogs.map((blog) => ({
                    title: blog.title,
                    image: blog.image,
                    blogText: blog.blogText,
                    id: blog._id.toString()

                }))
            }
        }
    }

