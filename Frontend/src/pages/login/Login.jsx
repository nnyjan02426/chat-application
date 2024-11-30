import './login.css';
import clear from './clear.svg';
import user from './user.svg';
import email from './email.svg';
import password from './password.svg';

const Login = () => {
  return (
    <div id='login'>
      <div id='login-info'>
        <h1>Login</h1>
        <div id='userName' className='searchInput'>
          <img src={user} alt='' id='user-icon' className='icon' />
          <input type="text" placeholder='username' id='username-input' />
          <img src={clear} alt='x' id='clear' className='button' />
        </div>

        <div id='email' className='searchInput'>
          <img src={email} alt='' id='email-icon' className='icon' />
          <input type="text" placeholder='email' id='email-input' />
          <img src={clear} alt='x' id='clear' className='button' />
        </div>

        <div id='password' className='searchInput'>
          <img src={password} alt='' id='password-icon' className='icon' />
          <input type="text" placeholder='password' id='password-input' />
          <img src={clear} alt='x' id='clear' className='button' />
        </div>

        <div id='login-buttons' className='buttons'>
          <p id='create-login' className='login-button'>Create Account</p>
          <p id='signin-login' className='login-button'>Sign In</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
