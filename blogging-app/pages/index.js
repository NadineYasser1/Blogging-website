import FlatButton from "@/components/FlatButton";
import Title from "@/components/Title";
import { AuthContext } from "@/store/auth-context";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import Head from "next/head";

export default function Home() {

  const { t } = useTranslation()
  const router = useRouter()
  const authCtx = useContext(AuthContext)
  function viewBlogsHandler() {
    if(authCtx.isAuthenticated){
    router.push('./'+router.locale+'/blogs')
    } else {
      router.push('/'+router.locale+'/login')
    }
  }

  return (
    <Fragment>
    <Head>
    <title>{t('Blogging app')}</title>
    <meta name="description" content="home-page"/>
    </Head>
    <div>
    <Title>{t("Welcome to the blogging App")}</Title>
    <FlatButton onPress={viewBlogsHandler}>{t("View Blogs")}</FlatButton>
   
    
    </div>
    </Fragment>
    

  )
}

export async function getServerSideProps({locale}) {

  return {
    props: {
      ...(await serverSideTranslations(locale)),

    }
  }
}