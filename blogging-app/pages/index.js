import FlatButton from "@/components/FlatButton";
import Title from "@/components/Title";
import { AuthContext } from "@/store/auth-context";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const authCtx = useContext(AuthContext)
  function viewBlogsHandler() {
    if(authCtx.isAuthenticated){
    router.push('./blogs')
    } else {
      router.push('/login')
    }
  }

  return (
    <Fragment>
    <div>
    <Title>{t("Welcome to the blogging App")}</Title>
    <FlatButton onPress={viewBlogsHandler}>{t("View Blogs")}</FlatButton>
   
    
    </div>
    </Fragment>
    

  )
}

export async function getStaticProps(context) {
  const { locale } = context
  // const res = await fetch(`http://localhost:3000/${locale}`)
  // const data = await res.json()

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // data,
      // locale,
    }
  }
}