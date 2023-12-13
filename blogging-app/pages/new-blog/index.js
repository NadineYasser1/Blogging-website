import { useRouter } from "next/router";
import NewBlogForm from "../../components/blogs/NewBlogForm";
import { Fragment } from "react";
import Head from "next/head";
import { useTranslation } from 'next-i18next'


function NewBlog() {
  const router = useRouter();


  async function addBlogHandler(blogData) {
  
    const res = await fetch('/api/new-blog', {
      method: "POST",
      body: JSON.stringify(blogData),
      headers: {
        "content-type" : "application/json"
      }
    })
    const data = await res.json()
    console.log(data)
    router.push('/blogs')
  }
  return (
    <Fragment>
    <Head>
    <title>Write a new blog</title>
    <meta name="description" content="write your own blogs"/>
    </Head>
      <NewBlogForm onAddBlog={addBlogHandler} />{" "}
    </Fragment>
  );
}
export default NewBlog;