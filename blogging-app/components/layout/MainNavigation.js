import { Fragment, useContext } from "react";
import classes from "./MainNavigation.module.css";
import Link from "next/link";
// import { useRouter } from "next/router";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "next-i18next";
import { AuthContext } from "@/store/auth-context";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";


function MainNavigation({ dir }) {

  // const { locales } = useRouter();
  const { t } = useTranslation('common');
  const router = useRouter()
  const authCtx = useContext(AuthContext)
  // console.log(authCtx.isAuthenticated)
  const { data: session } = useSession()

  async function signoutHandler() {
    authCtx.logout()
   await signOut({callbackUrl: '/'+router.locale})
  }
 

  return (
    <header className={classes.header}>
      <div className={classes.logo}>{t("Blogging app")}</div>
      <nav>
        <div>
          {" "}
          {session ? (
            <Fragment>
            <ul>
              <li>
              <Link href='/blogs'>{t("Home")}</Link>
              </li>
              <li>
              <Link href="/new-blog">{t("New Blog")}</Link>
              </li>
              <li><button className={classes.button} onClick={signoutHandler}>
              {t("Sign out")}
            </button>
            </li>
            <li> <LanguageSwitcher /> </li>
              </ul>
            </Fragment>
          ) : (
            <ul>
      
           <li> <Link href="/login">{t("Sign in")}</Link> </li> 
           <li> <LanguageSwitcher /> </li>
            </ul>
            
          )}{" "}
        </div>
      </nav>
    </header>
  );
}
export default MainNavigation;
