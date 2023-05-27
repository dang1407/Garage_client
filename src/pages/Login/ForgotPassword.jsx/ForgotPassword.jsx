import React from "react";
import { useState } from "react";
import { AiOutlineMail, AiFillCloseCircle } from "react-icons/ai";
import './ForgotPassword.css'
const ForgotPassword = ({onClose}) => {
  const [forgotEmail, setForgotEmail] = useState();

  return (
    <div className="fgpw-container flex-center">
      <div className="fg-password flex-center">
        <div className="fg-box"></div>
        
        <form className="fg-form">
          <div className="fg-close-btn"> 
            <span onClick={onClose}>
            <AiFillCloseCircle />
            </span>
          </div>

          <h1 className="login-head">Forgot Password</h1>
          <div className="fg-img"></div>
          <label htmlFor="fg-email">Nhập email của bạn để khôi phục tài khoản:</label>
          <div className="fg-input-box flex-center">
            <span>
              <AiOutlineMail />
            </span>
            <input type="email" required id="fg-email" placeholder="Email" />
          </div>
          <div className="fgpw-button">
              <button className="login-button">Send Request</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
