import { useRef } from 'react';
import { useTranslation } from 'next-i18next'
import classes from './SigninForm.module.css'


function SigninForm(props) {

  const { t } = useTranslation()

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();


  function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;


    const credentials = {
      username: enteredUsername,
      password: enteredPassword
    };
    console.log(credentials)

    props.onLogin(credentials);
  }

  return (
    <div className={classes.container}>
     <h1 className={classes.title}>{t('Login')}</h1>
 
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label className={classes.label} htmlFor="username">{t('Username:')}</label>
        <input
          type="text"
          required
          id="username"
          name="username"
          placeholder='Demo'
          ref={usernameInputRef}
          className={classes.input}
        />
      </div>
      <div>
        <label className={classes.label} htmlFor="password">{t('Password:')}</label>
        <input
          type="password"
          id="password"
          required
          name="password"
          placeholder='Password'
          ref={passwordInputRef}
          className={classes.input}
        />
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.button} type="submit">{t('Sign In')}</button>
      </div>
    </form>
    </div>
  );
};

export default SigninForm;

