import React, { useState } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';

const App = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isNewUserEmail, setIsNewUserEmail] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleLoginEmailChange = (email) => {
    setLoginEmail(email);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setLoginEmailError('Please enter a valid email');
    } else {
      setLoginEmailError('');
    }
  };


  const handleLoginPasswordChange = (password) => {
    setLoginPassword(password);
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,10}/.test(password)) {
      setLoginPasswordError('Wrong Password');
    } else {
      setLoginPasswordError('');
    }
  };

  const handleSignupUsernameChange = (username) => {
    setSignupUsername(username);
    if (!/^[a-zA-Z]+$/.test(username)) {
      setUsernameError('Username must only contain letters');
    } else {
      setUsernameError('');
    }
  };

  const handleSignupPasswordChange = (password) => {
    setSignupPassword(password);
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,10}/.test(password)) {
      setSignupPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 to 10 characters long');
    } else {
      setSignupPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    if (signupPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleLogin = () => {
    if (!loginEmail || !/\S+@\S+\.\S+/.test(loginEmail)) {
      setLoginEmailError('Please enter a valid email');
      return;
    } else {
      setLoginEmailError('');
    }

    if (!loginPassword || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,10}/.test(loginPassword)) {
      setLoginPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 to 10 characters long');
      return;
    } else {
      setLoginPasswordError('');
    }

    console.log('Login:', loginEmail, loginPassword);
  };

  const handleSignup = () => {
    if (!signupUsername || !/^[a-zA-Z]+$/.test(signupUsername)) {
      setUsernameError('Username must only contain letters');
      return;
    } else {
      setUsernameError('');
    }

    if (!signupPassword || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,10}/.test(signupPassword)) {
      setSignupPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 to 10 characters long');
      return;
    } else {
      setSignupPasswordError('');
    }

    if (!loginEmail || !/\S+@\S+\.\S+/.test(loginEmail)) {
      setLoginEmailError('Please enter a valid email');
      return;
    } else {
      setLoginEmailError('');
    }

    if (signupPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    } else {
      setConfirmPasswordError('');
    }

    console.log('Signup:', signupUsername, signupPassword, confirmPassword);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{isNewUser ? 'Sign Up' : 'Login'}</h2>
        {!isNewUserEmail && !isNewUser && (
          <>
            <input
              type="text"
              placeholder="username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </>
        )}
        {isNewUserEmail && (
          <>
            <input
              type="email"
              placeholder="Enter your Email"
              value={loginEmail}
              onChange={(e) => handleLoginEmailChange(e.target.value)}
            />
            {loginEmailError && <p className="error-message">{loginEmailError}</p>}
          </>
        )}
        {!isNewUser && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => handleLoginPasswordChange(e.target.value)}
            />
            {loginPasswordError && <p className="error-message">{loginPasswordError}</p>}
            <button onClick={handleLogin} className='loginbtn'>Login</button>
          </>
        )}
        {isNewUser && !isNewUserEmail && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => handleSignupUsernameChange(e.target.value)}
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </>
        )}
        {isNewUser && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => handleSignupPasswordChange(e.target.value)}
            />
            {signupPasswordError && <p className="error-message">{signupPasswordError}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
            <button onClick={handleSignup} className='signupbtn'>Sign Up</button>
          </>
        )}
        <div className="social-login">
          <div id="my-signin2">
            <GoogleLogin
              clientId="40740878192.apps.googleusercontent.com"
              buttonText={isNewUser ? "Sign up with Google" : "Sign in with Google"}
              cookiePolicy={'single_host_origin'}
              scope={'profile email'}
              theme={'dark'}
            />
          </div>
          <div className='Signinwemail'>
            <h4 href='' onClick={() => setIsNewUserEmail(!isNewUserEmail)} style={{ textDecoration: "underline", color: "white" }}>{isNewUser ? 'Sign up with Email' : 'Sign in with Email'}</h4>
          </div>
        </div>
        <h4 onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? 'Already have an account? Login' : 'New user? Sign up'}
        </h4>
      </div>
    </div>
  );
};

export default App;

