import './login.css';
import clearIcon from './clear.svg';
import userIcon from './user.svg';
import emailIcon from './email.svg';
import passwordIcon from './password.svg';
import defaultAvatar from './defaultAvatar.svg';
import { useState } from 'react';

const Login = ({ setUser }) => {
  // TODO: email & password regex
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [avatar, setAvatar] = useState({ file: null, url: "" })
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    if (email === '' || password === '' || (action === 'register' && username === '')) alert('please fill in the required fields');

    const url = (action === 'login') ? '/api/auth/login' : '/api/auth/register';
    const payload = (action === 'login')
      ? { email, password }
      : { email, password, username };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

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
        alert(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div id="loginSignUp">
      <div id='login'>
        <div id='login-info'>
          <h1>Login</h1>
          <div id='email' className='searchInput'>
            <img src={emailIcon} alt='' id='email-icon' className='icon' />
            <input type="text" placeholder='email *' id='email-input' onChange={(e) => setEmail(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setEmail('')} />
          </div>

          <div id='password' className='searchInput'>
            <img src={passwordIcon} alt='' id='password-icon' className='icon' />
            <input type="text" placeholder='password *' id='password-input' onChange={(e) => setPassword(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setPassword('')} />
          </div>

          <div id='login-buttons' className='buttons'>
            <p id='signin-login' className='login-button' onClick={(e) => handleSubmit(e, 'login')}>Sign In</p>
            {/* allow user to sign in as guest */}
            {/* <p id='guest-login' className='login-button' >Login as Guest</p> */}
          </div>
        </div>
      </div>
      <div id='signUp'>
        <div id='signUp-info'>
          <h1>Sign Up</h1>
          <div id='uploadImage'>
            <label htmlFor='file'>
              <img src={avatar.url || defaultAvatar} alt="" /><p>Upload an Image</p>
            </label>
            <input type="file" id="file" style={{ display: 'none' }} onChange={handleAvatar} />
          </div>
          <div id='userName' className='searchInput'>
            <img src={userIcon} alt='' id='user-icon' className='icon' />
            <input type="text" placeholder='username *' id='username-input' onChange={(e) => setUsername(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setUsername('')} />
          </div>

          <div id='email' className='searchInput'>
            <img src={emailIcon} alt='' id='email-icon' className='icon' />
            <input type="text" placeholder='email *' id='email-input' onChange={(e) => setEmail(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setEmail('')} />
          </div>

          <div id='password' className='searchInput'>
            <img src={passwordIcon} alt='' id='password-icon' className='icon' />
            <input type="text" placeholder='password *' id='password-input' onChange={(e) => setPassword(e.target.value)} />
            <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setPassword('')} />
          </div>

          <div id='login-buttons' className='buttons'>
            <p id='create-login' className='login-button' onClick={(e) => handleSubmit(e, 'register')}>Create Account</p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Login;
