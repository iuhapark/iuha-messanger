import '@/styles/_index.scss';

import { login } from "@/lib/auth";

const Login = () => {
  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={login}>
        <h1 className='login-title'>Login</h1>
        <input type='text' name='username' placeholder='Username' required />
        <input type='password' name='password' placeholder='Password' required />
        <button type='submit'>Login</button>
      </form>
      </div>
  );
}

export default Login;