import { Fragment } from 'react';
import SigninForm from '../../components/SigninForm';
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next';
import Head from "next/head";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';


function Login() {

  const { t } = useTranslation()
  const router = useRouter()
 
   async function loginHandler({username, password}) {

    await signIn('credentials', { username, password, callbackUrl: '/'+ router.locale +'/blogs'})

  }

  return (
    <Fragment>
    <Head>
    <title>{t('Log in')}</title>
    <meta name="description" content="login"/>
    </Head>
      <SigninForm onLogin={loginHandler}/>
      </Fragment>
    
  );
};

export async function getServerSideProps({locale}) {


  return {
    props: {
      ...(await serverSideTranslations(locale)),

    }
  }
}
export default Login;



