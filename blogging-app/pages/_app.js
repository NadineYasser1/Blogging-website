import { appWithTranslation } from 'next-i18next'

import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/layout/Layout'
import AuthContextProvider from '@/store/auth-context';


function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
  <SessionProvider session={session}>
  <AuthContextProvider>
  <Layout> <Component {...pageProps} /> </Layout> 
  </AuthContextProvider>
  </SessionProvider>
  );
}

export default appWithTranslation(App)
