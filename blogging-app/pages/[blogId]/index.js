import { MongoClient } from "mongodb";
import BlogDetail from "@/components/blogs/BlogDetail";
import { dbUrl } from "../api/new-blog";

const ObjectId = require('mongodb').ObjectId;



function BlogDetails(props) {

    return <BlogDetail image={props.blogData.image} title={props.blogData.title} blogText={props.blogData.blogText}/>

}


export async function getStaticPaths() {

  const client = await MongoClient.connect(dbUrl)
  const db = client.db()
  const blogsCollection = db.collection('blogs')
  const blogs = await blogsCollection.find({}, {_id: 1}).toArray()
  client.close()

  return {
    fallback: false, 
    paths: blogs.map((blog) => ({
      params: {blogId: blog._id.toString()}
    }))
}
}
export async function getStaticProps(context) {

    const blogId = context.params.blogId; 
    // console.log('BLOG ID '+blogId)
    const client = await MongoClient.connect(dbUrl)
    const db = client.db()
    const blogsCollection = db.collection('blogs')
    const selectedBlog = await blogsCollection.findOne({_id: new ObjectId(blogId)})
    client.close()

    return {
      props: {
        blogData: {
            id: (await selectedBlog)._id.toString(),
            image: selectedBlog.image,
            title: selectedBlog.title,
            blogText: selectedBlog.blogText
        }
      }
      }
    }


export default BlogDetails;