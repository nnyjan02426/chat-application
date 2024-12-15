import './login.css';
import clearIcon from './clear.svg';
import userIcon from './user.svg';
import emailIcon from './email.svg';
import passwordIcon from './password.svg';
import { useState } from 'react';

const socket_url = "https://webchatapp-ace8c3b8dmeqh0ay.canadacentral-01.azurewebsites.net"

const Login = ({ setUser }) => {
  // TODO: email & password regex
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, action) => {
    if (isLoading) return;
    e.preventDefault();

    if (email === '' || password === '' || (action === 'register' && username === '')) {
      alert('please fill in the required fields');
      return;
    }

    try {
      setIsLoading(true);
      const url = (action === 'login') ? `${socket_url}/api/auth/login` : `${socket_url}/api/auth/register`;
      const payload = (action === 'login')
        ? { email, password }
        : { email, password, username };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });


      if (!response.headers.get('content-type')?.includes('application/json')) {
        alert("Error: invalid header response", response.headers.get('content-type'));
        console.log('Raw response: ', response);
      }

      const data = await response.json();

      if (response.ok) {
        // Save token or user details in localStorage or context
        console.log('Success:', data);
        localStorage.setItem('token', data.token);
        alert((action === 'login') ? 'Login successful!' : 'Account created successfully!');
        setUser(true);

        // Redirect to chatroom or reload the app
        window.location.reload();
      } else {
        alert(`Error: ${data.message} || 'Something went wrong!'`);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Server error Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div id="loginSignUp">
      <div id='login' className='info-box'>
        <div id='login-info' className='input-info'>
          <h1>Login</h1>
          <div id='email' className='searchInput'>
            <img src={emailIcon} alt='' id='email-icon' className='icon' />
            <input type="text" placeholder='email *' id='email-input' value={email} onChange={(e) => setEmail(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setEmail('')} />
          </div>

          <div id='password' className='searchInput'>
            <img src={passwordIcon} alt='' id='password-icon' className='icon' />
            <input type="text" placeholder='password *' id='password-input' value={password} onChange={(e) => setPassword(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setPassword('')} />
          </div>

          <div id='login-buttons' className='buttons'>
            <p id='signin-login' className='login-button' onClick={(e) => handleSubmit(e, 'login')}>
              {isLoading ? "Loading..." : "Sign In"}
            </p>
            {/* allow user to sign in as guest */}
            {/* <p id='guest-login' className='login-button' >Login as Guest</p> */}
          </div>
        </div>
      </div>
      <div id='signUp' className='info-box'>
        <div id='signUp-info' className="input-info">
          <h1>Sign Up</h1>
          <div id='userName' className='searchInput'>
            <img src={userIcon} alt='' id='user-icon' className='icon' />
            <input type="text" placeholder='username *' id='username-input' value={username} onChange={(e) => setUsername(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setUsername('')} />
          </div>

          <div id='email' className='searchInput'>
            <img src={emailIcon} alt='' id='email-icon' className='icon' />
            <input type="text" placeholder='email *' id='email-input' value={email} onChange={(e) => setEmail(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setEmail('')} />
          </div>

          <div id='password' className='searchInput'>
            <img src={passwordIcon} alt='' id='password-icon' className='icon' />
            <input type="text" placeholder='password *' id='password-input' value={password} onChange={(e) => setPassword(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setPassword('')} />
          </div>

          <div id='login-buttons' className='buttons'>
            <p id='create-login' className='login-button' onClick={(e) => handleSubmit(e, 'register')}>
              {isLoading ? "Loading..." : "Create Account"}
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Login;
