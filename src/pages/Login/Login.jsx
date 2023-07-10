import React, { useContext } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './Login.scoped.css';
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri'
// import component
import ForgotPassword from './ForgotPassword.jsx/ForgotPassword';
import LoginFailed from './LoginFailed/LoginFailed';
import AccessTokenContext from '../../Token/AccessTokenContext';
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLogined, setIsLogined] = useState(0);
  const [fgPassword, setFgPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const {handleLogin} = useContext(AccessTokenContext);
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState();
  async function loginUser(event){
    event.preventDefault();

    const respone = await fetch('http://localhost:5000/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        email,
        password
      })
    });

    // Phải có await mới lấy ra được status -_-
    const data = await respone.json();
    console.log(data)
    if(data.status === "OK"){
      localStorage.setItem("accessToken",data.accessToken);
       setIsLogined(true);
      setRole(data.role)
      handleLogin(data.accessToken, data.role)
      setAccessToken(data.accessToken)
    } else if(data.status === "error"){
      setLoginFailed(true);
    }
  }

  function handleFgPassword(e){
    e.preventDefault()
    setFgPassword(true)
  }

  function closeFgPassword(){
    setFgPassword(false)
  }


  function closeLoginFailed(){
    setLoginFailed(false)
  }
  if(isLogined === true){
    navigate('/', {state: {accessToken, role}})
    // return <Navigate to='/' {state: {accessToken}}></Navigate>
  }

  return (
    <div className="login-container">
      <div className="form-container">
        
        <div className="image-box">
          {/* <img src="../../../pulic/images/thumb_image.png" alt="" /> */}
        </div>
        
        <div className="form-box">
          <form action="" className="login-form">
            {/* Login box */}
            <div className="login-box">
              <h1 className='login-head' >LOGIN</h1>
              <div className="input-box">
                <span>
                  <AiOutlineMail />
                </span>
                {/* <label htmlFor="email-input">Email</label> */}
                <input 
                  type="email" 
                  required 
                  id='email-input' 
                  placeholder='Email'
                  value={email}
                  onChange = {(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="input-box">
                <span>
                  <RiLockPasswordLine />
                </span>
                {/* <label htmlFor="password-input">Password</label> */}
                <input 
                  type="password" 
                  required 
                  id='password-input' 
                  placeholder='Password'
                  value={password}
                  onChange = {(e) => setPassword(e.target.value)}
                  />
              </div>
              <button className='login-button' onClick={loginUser}>Login</button>
              <div className="forgot-password">
                {/* <p > Forgot <Link to='/updateacc'>password</Link></p> */}
                <button onClick={handleFgPassword}>Forgot password</button>
                {/* <p>Forgot <a onClick={handleFgPassword} style={{cursor: 'pointer'}}>password</a></p> */}
              </div>
          
            </div>
          </form>
          <div className="create-acc" style={{display: 'flex', flexDirection: 'column'}}>
              <Link to='/register'>Create a new account</Link>
          </div>
        </div>
        
      </div>
      {
        fgPassword && 
        <ForgotPassword onClose={closeFgPassword}/>
      }

      {
        loginFailed && <LoginFailed onClose={closeLoginFailed} />
      }

    </div>
  )
}

export default Login