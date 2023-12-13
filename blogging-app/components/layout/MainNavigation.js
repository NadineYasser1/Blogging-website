import { Fragment, useContext } from "react";
import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
// import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "next-i18next";
import { AuthContext } from "@/store/auth-context";
import { signOut } from "next-auth/react";

function MainNavigation({ dir }) {
  const { locales } = useRouter();
  const { t } = useTranslation();
  const authCtx = useContext(AuthContext)
  console.log(authCtx.isAuthenticated)

  async function signoutHandler() {
    authCtx.logout()
   await signOut({callbackUrl: '/'})
  }
 

  return (
    <header className={classes.header}>
      <div className={classes.logo}>{t("Blogging app")}</div>
      <nav>
        <div>
          {" "}
          {authCtx.isAuthenticated ? (
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
              </ul>
            </Fragment>
          ) : (
            <Link href="/login">{t("Sign in")}</Link>
          )}{" "}
        </div>
      </nav>
    </header>
  );
}
export default MainNavigation;
