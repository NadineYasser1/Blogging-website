import BlogList from "@/components/blogs/BlogList";
import { dbUrl } from "../api/new-blog";
import { MongoClient } from "mongodb";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Blogs({ blogs }) {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const authCtx = useContext(AuthContext);

  if (!session) {
    return (
      <Fragment>
        <p>{t("You are not authorized to access this page.")}</p>
        <Link href="/login">{t("Login?")}</Link>
      </Fragment>
    );
  }

  console.log(session);
  const token = session.token.token.jti;
  authCtx.authenticate(token);

  return (
    <Fragment>
      <Head>
        <title>{t("All blogs")}</title>
        <meta name="description" content="view blogs" />
      </Head>
      <BlogList blogs={blogs} />
    </Fragment>
  );
}

export default Blogs;



export async function getServerSideProps({locale}) {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db();
  const blogsCollection = db.collection("blogs");
  const blogs = await blogsCollection.find().toArray();
  client.close();

  return {
    props: {
      blogs: blogs.map((blog) => ({
        title: blog.title,
        image: blog.image,
        blogText: blog.blogText,
        id: blog._id.toString(),
        
      })),
      ...(await serverSideTranslations(locale)),
    },
  };
}
