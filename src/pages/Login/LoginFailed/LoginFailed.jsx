import React from "react";
import { useState } from "react";
import { AiOutlineMail, AiFillCloseCircle } from "react-icons/ai";
const LoginFailed = ({onClose}) => {
  const [forgotEmail, setForgotEmail] = useState();

  function notSubmitForm(e){
    e.preventDefault();
  }

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
          <div className="fg-img"></div>
          <label htmlFor="fg-email">Tài khoản hoặc mật khẩu không đúng</label>
        </form>
      </div>
    </div>
  );
};

export default LoginFailed;
