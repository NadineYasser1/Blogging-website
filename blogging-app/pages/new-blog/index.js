import { useRouter } from "next/router";
import NewBlogForm from "../../components/blogs/NewBlogForm";
import { Fragment } from "react";
import Head from "next/head";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


function NewBlog() {
  const router = useRouter();
  const { t } = useTranslation()


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
    <title>{t('Write a new blog')}</title>
    <meta name="description" content="write your own blogs"/>
    </Head>
      <NewBlogForm onAddBlog={addBlogHandler} />{" "}
    </Fragment>
  );
}
export async function getServerSideProps({locale}) {


  return {
    props: {
      ...(await serverSideTranslations(locale)),

    }
  }
}
export default NewBlog;