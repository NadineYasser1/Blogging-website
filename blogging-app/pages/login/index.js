import SigninForm from '../../components/SigninForm';
import { signIn } from 'next-auth/react'


function Login() {
 
   async function loginHandler({username, password}) {

    await signIn('credentials', { username, password, callbackUrl: '/blogs'})

  }

  return (
      <SigninForm onLogin={loginHandler}/>
    
  );
};

export default Login;


